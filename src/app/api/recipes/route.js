import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';


export async function GET() {
  console.log('in GET');
  try {
    console.log('in try');
    const client = await clientPromise;
    console.log('client');
    const db = client.db('recipes'); 
    console.log(db);
    const recipes = await db.collection('recipes').find({}).toArray();
    console.log(recipes);
    return NextResponse.json(recipes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}


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


