// src/app/api/recipes/route.js
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// GET - שליפת כל המתכונים
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('recipes'); // הכניסי כאן את שם הדאטהבייס שלך
    const recipes = await db.collection('recipes').find({}).toArray();
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

// GET - שליפת מתכון לפי ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const client = await clientPromise;
    const db = client.db('recipes');
    const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(id) });
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}

// POST - יצירת מתכון חדש
export async function POST(request) {
  const newRecipe = await request.json();
  try {
    const client = await clientPromise;
    const db = client.db('recipes');
    const result = await db.collection('recipes').insertOne(newRecipe);
    return NextResponse.json(result.ops[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}

// PUT - עדכון מתכון לפי ID
export async function PUT(request) {
  const updatedRecipe = await request.json();
  try {
    const client = await clientPromise;
    const db = client.db('recipes');
    const result = await db.collection('recipes').updateOne(
      { _id: new ObjectId(updatedRecipe.id) },
      { $set: updatedRecipe }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(updatedRecipe);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
  }
}

// DELETE - מחיקת מתכון לפי ID
export async function DELETE(request) {
  const { id } = await request.json();
  try {
    const client = await clientPromise;
    const db = client.db('recipes');
    const result = await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import recipes from '@/lib/db.js';

// export async function GET() {
//     return NextResponse.json(recipes);
// }

// export async function GET(request, { params }) {
//     const { id } = params;
//     const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
  
//     if (!recipe) {
//       return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
//     }
  
//     return NextResponse.json(recipe);
// }

// export async function POST(request) {
//     const newRecipe = await request.json();
//     newRecipe.id = ObjectId();
//     recipes.push(newRecipe);
//     return NextResponse.json(newRecipe, { status: 201 });
// }

// export async function PUT(request) {
//     const updatedRecipe = await request.json();
//     const index = recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
//     if (index === -1) {
//       return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
//     }
//     recipes[index] = updatedRecipe;
//     return NextResponse.json(updatedRecipe);
// }

// export async function DELETE(request) {
//     const { id } = await request.json();
//     const index = recipes.findIndex(recipe => recipe.id === id);
//     if (index === -1) {
//       return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
//     }
//     const deletedRecipe = recipes.splice(index, 1);
//     return NextResponse.json(deletedRecipe[0]);
// }