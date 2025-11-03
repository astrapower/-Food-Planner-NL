"use client";

import { useEffect, useState } from "react";

type Recipe = {
  id: number;
  title: string;
  ingredients: string;
  steps: string;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  async function loadRecipes() {
    const res = await fetch("/api/recipes");
    const data = await res.json();
    setRecipes(data);
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, ingredients, steps }),
    });
    setTitle("");
    setIngredients("");
    setSteps("");
    await loadRecipes();
  }

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Food Planner NL</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe title"
          style={{ display: "block", marginBottom: 8, width: 300 }}
          required
        />
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients"
          style={{ display: "block", marginBottom: 8, width: 300, height: 80 }}
        />
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Steps"
          style={{ display: "block", marginBottom: 8, width: 300, height: 80 }}
        />
        <button type="submit">Save recipe</button>
      </form>

      <h2>Recipes</h2>
      {recipes.length === 0 && <p>No recipes yet.</p>}
      <ul>
        {recipes.map((r) => (
          <li key={r.id}>
            <strong>{r.title}</strong>
            <div>{r.ingredients}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
