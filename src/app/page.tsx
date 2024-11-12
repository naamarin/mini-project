"use client";
import Link from 'next/link';
// import Image from "next/image";
// import Recipes from "./recipes/page";
// import RecipesHeader from '@/components/recipesHeader/recipesHeader';

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


