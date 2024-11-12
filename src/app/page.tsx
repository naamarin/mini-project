import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to /recipes
  redirect('/recipes');

  return null; // Render nothing as we are redirecting
}