import { Box } from '@mui/material';
import React,{ useState, useEffect} from 'react';
import Tree from 'react-d3-tree';
import AddPerson from './UI/AddPersonModal';
import PersonCard from './UI/PersonCard';
import {v4} from "uuid";
import ChangePersonModal from './UI/ChangePersonModal';
export function bfs(id, tree,node){
  const queue = [];

  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop();
    if (curNode?.id === id) {
      curNode.children.push(node);
      return { ...tree };
    }

    const len = curNode.children.length;

    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i]);
    }
  }
}




const FamilyTree = () => {
  const [loading, setLoading] = useState(true);
  const [tree, setTree] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const savedTree = localStorage.getItem('familyTree');
    if (savedTree) {
      setTree(JSON.parse(savedTree));
    } else if (savedTree === null) {
      // Инициализация дерева, если оно не существует в локалсторе браузера
      setTree({
        id: 'root',
        attributes: {
          name: 'Вадим',
          surname: 'Кравцов',
          gender: 'М',
          bdate: '02.03.2003'
        },
        children: []
      });
    }
    setLoading(false);
  }, []);



  const [node, setNode] = React.useState();
  const handleNodeAdd = (datum) => {setNode(datum)};
  const handleNodeClose = () => setNode(undefined)


  const [newNode, setNewNode] = React.useState();
  const handleNodeChange = (datum) => {setNewNode(datum)};
  const handleNodeChangeClose = () => setNewNode(undefined)

  const handleAddPerson = (personData) => {
    const newTree = bfs(node?.id, tree, {
      id: v4(),
      attributes: {
        ...personData
      },
      children: [],
    });
    if (newTree) {
      setTree(newTree);
    }

    setNode(undefined);
  }

  const handleNodeDelete = (id) => {
    const updatedTree = { ...tree }; 
    const deleteNodeById = (node) => {
      if (node.id === id) {
        return null;
      }
      if (node.children && node.children.length > 0) {
        node.children = node.children.filter((child) => deleteNodeById(child));
      }
  
      return node;
    };
  
    updatedTree.children = updatedTree.children.filter((child) =>
      deleteNodeById(child)
    );
    setTree(updatedTree);
  };
const updatePersonInfo = (id, newInfo) => {
  const updatedTree = { ...tree }; 

  const updatePersonInfoById = (node) => {
    if (node.id === id) {
      node.attributes = { ...node.attributes, ...newInfo };
    }
    if (node.children && node.children.length > 0) {
      node.children = node.children.map((child) => updatePersonInfoById(child));
    }

    return node;
  };

  if (updatedTree.id === id) {
    updatedTree.attributes = { ...updatedTree.attributes, ...newInfo };
  } else {
    updatedTree.children = updatedTree.children.map((child) =>
      updatePersonInfoById(child)
    );
  }

  setTree(updatedTree);
};



useEffect(() => {
  if (tree !== null) {
    localStorage.setItem('familyTree', JSON.stringify(tree));
  }
}, [tree]);

if (loading) {
  return;
}


const searchNodes = (query) => {
  if (!query) {
    setSearchResults([]);
    return;
  }

  const results = [];

  const searchTree = (node) => {
    if (
      node.attributes.name.toLowerCase().includes(query.toLowerCase()) ||
      node.attributes.surname.toLowerCase().includes(query.toLowerCase())
    ) {
      results.push(node);
    }

    node.children.forEach((child) => searchTree(child));
  };

  searchTree(tree);
  setSearchResults(results);
};

// Handle search input change
const handleSearchInputChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);
  searchNodes(query);
};


  return (
    <Box sx={{width:'100vw', height:'99vh', margin:'auto'}}>
      <Tree 
      data={tree} 
      onNodeClick={{handleNodeAdd, handleNodeDelete,handleNodeChange}}
      orientation="horizontal" 
      allowForeignObjects={true}
      renderCustomNodeElement={(nodeData) =>
            PersonCard(nodeData, handleNodeAdd,handleNodeDelete,handleNodeChange)
          }
          nodeSize={{x: 400, y: 300}}
      />

      <AddPerson 
      open={Boolean(node)}
      handleClose={handleNodeClose}
      onSubmit = {handleAddPerson}
      />
      <ChangePersonModal
      open={Boolean(newNode)}
      nodeData={newNode}
      onSubmit = {updatePersonInfo}
      handleClose={handleNodeChangeClose}
      />
       <div style={{position:'absolute', right:'100px', top:'100px'}}>

      {/* Можно накатать юи и вынести в отдельный функциональный компонент, но суть та-же */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Поиск по имени или фамилии"
      />

      {/* Можно накатать юи и вынести в отдельный функциональный компонент, но суть та-же */}
      {searchResults.length > 0 && (
        <div>
          <h2>Результат поиска</h2>
          {searchResults.map((node) => (
            <div key={node.id}>
              <div>
                <strong>Имя: </strong>
                {node.attributes.name}
              </div>
              <div>
                <strong>Фамилия: </strong>
                {node.attributes.surname}
              </div>
              <div>
                <strong>Пол: </strong>
                {node.attributes.gender}
              </div>
              <div>
                <strong>Дата рождения: </strong>
                {node.attributes.bdate}
              </div>
            </div>
          ))}
        </div>
      )}


      <div>
      </div>
    </div>
    </Box>
  );
};

export default FamilyTree;
