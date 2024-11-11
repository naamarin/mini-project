import { useState } from "react";
import { useForm, Controller, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const recipeSchema = z.object({
    recipeName: z.string().min(1, "You need to write the recipe name"),
    category: z.enum(["Breakfest", "Pasta", "Salad", "Main course", "Dessert"], {
      required_error: "You need to choose category",
    }),
    imageUrl: z.string().url("You need enter a URL of the recipe"),
    ingredients: z
      .array(
        z.object({
          name: z.string().min(1, "Ingredient name is required"),
          quantity: z.string().min(1, "Ingredient quantity is required"),
        })
      )
      .min(1, "You need to enter at least one ingredient"),
    instructions: z.string().min(1, "You need to enter instructions"),
  });

type RecipeFormData = z.infer<typeof recipeSchema>;

export default function AddRecipe() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [""],
    },
  });


  const { fields, append } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<RecipeFormData> = (data) => {
    console.log("Recipe data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Meal name:</label>
        <input type="text" {...register("recipeName")} />
        {errors.recipeName && (
          <p style={{ color: "red" }}>{errors.recipeName.message}</p>
        )}
      </div>

      <div>
        <label>Category:</label>
        <select {...register("category")}>
          <option value="Breakfest">Breakfest</option>
          <option value="Pasta">Pasta</option>
          <option value="Salad">Salad</option>
          <option value="Main course">Main course</option>
          <option value="Dessert">Dessert</option>
        </select>
        {errors.category && (
          <p style={{ color: "red" }}>{errors.category.message}</p>
        )}
      </div>

      <div>
        <label>Image URL:</label>
        <input type="text" {...register("imageUrl")} />
        {errors.imageUrl && (
          <p style={{ color: "red" }}>{errors.imageUrl.message}</p>
        )}
      </div>

      <div>
        <label>Ingredients</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Controller
              control={control}
              name={`ingredients.${index}` as const}  
              render={({ field }) => (
                <>
                  <input type="text" {...field} placeholder="ingredient" />
                  {errors.ingredients?.[index]?.message && (
                    <p style={{ color: "red" }}>
                      {errors.ingredients[index].message}
                    </p>
                  )}
                </>
              )}
            />
            {index === fields.length - 1 && (
              <button type="button" onClick={() => append("")}>
                +
              </button>
            )}
          </div>
        ))}
        {errors.ingredients && (
          <p style={{ color: "red" }}>{errors.ingredients.message}</p>
        )}
      </div>

      <div>
        <label>Instructions</label>
        <textarea {...register("instructions")} />
        {errors.instructions && (
          <p style={{ color: "red" }}>{errors.instructions.message}</p>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => (window.location.href = "../recipes")}
        >
          Back
        </button>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
