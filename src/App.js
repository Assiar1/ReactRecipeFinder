import React, { useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Header from "./components/headerComponent";
import Recipe from "./components/recipeComponent";


const APP_ID = "4a7ec2ef";
const APP_KEY = "fd34efcc304463ce932f57edd964457f";


const Container=styled.div`
  display: flex;
  flex-direction: column;
`;
const Placeholder=styled.img`
  width:120px;
  height:120px;
  margin:200px;
  opacity:50%;
`;


const RecipeComponent= (props) => {
  const [show, setShow] = React.useState(false);  //  Dialog closed by default
  const {recipeObj}=props;
  return (
    <>
      <Dialog open={show}>
      <DialogTitle>Ingredients</DialogTitle>
      <DialogContent>
        <table>
          <thead>
              <th>Ingredients</th>
              <th>Weight</th>
              
          </thead>
          <body>
            {recipeObj.ingredients.map((ingredientObj)=>(
              <tr>
                <td>{ingredientObj.text}</td>
                <td>{ingredientObj.weight}</td>
              </tr>
            ))}
          </body>
        </table>
      </DialogContent>
      <DialogActions>
          <Recipe.IngredientsText  onClick={()=>window.open(recipeObj.url)}>
            see More
            </Recipe.IngredientsText>
          <Recipe.SeeMoreText  onClick={()=>setShow("")}>
            close
            </Recipe.SeeMoreText>
        </DialogActions>
      </Dialog>
      <Recipe.RecipeContainer>
        <Recipe.CoverImage src={recipeObj.image}/>
        <Recipe.RecipeName>{recipeObj.label}</Recipe.RecipeName>
        <Recipe.IngredientsText  onClick={()=>setShow(true)}>Ingredients</Recipe.IngredientsText>
        <Recipe.SeeMoreText onClick={()=>window.open(recipeObj.url)}>see complete Recipe</Recipe.SeeMoreText>
      </Recipe.RecipeContainer>
    </>
  );
};

function App() {
  const [timeoutId, updatetimeoutId] = useState();
  const [RecipeList, updateRecipeList] = useState([]);
  const fetchRecipe =async(searchString)=>{
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    updateRecipeList(response.data.hits);
  };


  const onTextChange=(event)=> {
    clearTimeout(timeoutId);
    const timeout=setTimeout(()=> fetchRecipe(event.target.value),500);
    updatetimeoutId(timeout);
  };

  return (
    <Container>
      <Header.Container >
        <Header.AppNameComponent><Header.AppIcon src="/react-recipe-finder/hamburger.svg"/>Recipe Finder</Header.AppNameComponent>
        <Header.SearchComponent>
          <Header.SearchIcon src="/react-recipe-finder/search-icon.svg" />
          <Header.SearchInput placeholder="Search Recipe" onChange={onTextChange} />
        </Header.SearchComponent>
      </Header.Container>
      
      <Recipe.RecipeListContainer>
        {RecipeList.length ?
        RecipeList.map((recipeObj)=>(
        <RecipeComponent recipeObj ={recipeObj.recipe} />
        )): <Placeholder src="/react-recipe-finder/hamburger.svg"/>}
      </Recipe.RecipeListContainer>


    </Container>
  );
};

export default App;