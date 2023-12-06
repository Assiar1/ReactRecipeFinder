import styled from "styled-components";

const RecipeListContainer=styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap:wrap;
  padding:30px;
  justify-content:space-evenly;
  gap:20px;
`;
const RecipeContainer=styled.div`
  display:flex;
  flex-direction:column;
  padding:10px;
  width:300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;
const CoverImage=styled.img`
  height:200px;
  object-fit:cover;
`;
const RecipeName=styled.span`
  font-size:18px;
  font-weight:bold;
  color:black;
  margin:10px 0;
`;
const IngredientsText=styled.span`
  border:solid 1px green;
  color:green;
  font-size:18px;
  padding:10px 15px;
  text-align:center;
  cursor: pointer;
  border-radius:4px;
  margin-bottom:12px;
`;
const SeeMoreText=styled(IngredientsText)`
  color:red;
  border: solid 1px red;
`;
export default { RecipeListContainer, RecipeContainer,CoverImage,RecipeName,IngredientsText,SeeMoreText};