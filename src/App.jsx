import { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [data,setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    fetchPosts(); // Call fetchPosts directly (not async)
  }, []);

  const fetchPosts = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`, { method: 'GET' })
      .then((response) => response.json()) // Handle the resolved data
      .then((data1) => {
         setData(data1);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = data.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(data)
    }
}


  return (
    <div>
      <input  style={{width:"90vh",height:"5vh",borderRadius:4,fontSize:20}}
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
    
    {searchInput.length > 1 ? (
                    filteredResults.map((post) => {
                        return (
                          <Card key={post.id} style={{width:"100vh",alignSelf:"center",justifySelf:"center",justifyContent:"center",margin:12}}>
                          <CardContent>
                            {/* <CardHeader sx={{fontSize:22,backgroundColor:"green",color:"yellow"}}> Title</CardHeader> */}
                          <Typography sx={{ fontSize: 22 }} >
                           {post.title}
                            </Typography>
                    
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {post.title}
                            </Typography>
                           
                          </CardContent>
                        
                        </Card>
                        )
                    })
                ) : (
                
                  data.map((post) =>(
                    <Card key={post.id} style={{width:"100vh",alignSelf:"center",justifySelf:"center",justifyContent:"center",margin:12}}>
                    <CardContent>
                      {/* <CardHeader sx={{fontSize:22,backgroundColor:"green",color:"yellow"}}> Title</CardHeader> */}
                    <Typography sx={{ fontSize: 22 }} >
                     {post.title}
                      </Typography>
              
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {post.title}
                      </Typography>
                     
                    </CardContent>
                  
                  </Card>
                  ))
                )}
      
</div>
  )
}

export default App

