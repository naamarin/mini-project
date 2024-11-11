import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

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
  } 
  
  catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}
