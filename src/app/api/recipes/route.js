import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';


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

export async function POST(request) {
  const newRecipe = await request.json();
  try {
    const client = await clientPromise;
    const db = client.db('recipes');
    const result = await db.collection('recipes').insertOne(newRecipe);
    return NextResponse.json(result.insertedId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}


