"use client";
import Link from 'next/link';
import Image from "next/image";
import Recipes from "./recipes/page";

export default function Home() {
  
  return (
    <header style={{ padding: '20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ccc' }}>
        <h1>Recipes</h1>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link href="/recipes">All Recipes</Link>
          <Link href="/favorites">Favorites</Link>
        </nav>
      </header>
      
  );
}

//hbukug
// export default function Home() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// useEffect(() => {
//   const fetchRecipes = async () => {
//     try {
//       const data = await getRecipes();
//       setRecipes(data);
//     } catch (err) {
//       setError('Failed to fetch recipes');
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchRecipes();
// }, []);

//   return (
//     <div>
//       <header style={{ padding: '20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ccc' }}>
//         <h1>Recipes</h1>
//         <nav style={{ display: 'flex', gap: '20px' }}>
//           <Link href="/recipes">All Recipes</Link>
//           <Link href="/favorites">Favorites</Link>
//         </nav>
//       </header>

//       <main style={{ padding: '20px' }}>
//         {loading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//         {recipes.length > 0 ? (
//           <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//             {recipes.map((recipe) => (
//               <div key={recipe._id} style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}>
//                 <img src={recipe.image} alt={recipe.nameRecipe} style={{ width: '100%' }} />
//                 <h3>{recipe.nameRecipe}</h3>
//                 <p>{recipe.category}</p>
//                 <p>{recipe.preparationInstructions.slice(0, 50)}...</p>
//                 <Link href={`/recipes/${recipe._id}`}>View Recipe</Link>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No recipes available</p>
//         )}
//       </main>
//     </div>
//   );
// }
