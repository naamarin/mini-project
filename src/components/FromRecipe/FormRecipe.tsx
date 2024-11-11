import { useState } from "react";
import { useForm, Controller, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from  '@/components/FromRecipe/FormRecipe.module.css';

const recipeSchema = z.object({
  nameRecipe: z.string().min(1, "You need to write the recipe name"),
    category: z.enum(["Breakfest", "Pasta", "Salad", "Main course", "Dessert"], {
      required_error: "You need to choose category",
    }),
    image: z.string().url("You need enter a URL of the recipe"),
    ingredients: z
      .array(
        z.object({
          name: z.string().min(1, "Ingredient name is required"),
          quantity: z.string().min(1, "Ingredient quantity is required"),
        })
      )
      .min(1, "You need to enter at least one ingredient"),
      preparationInstructions: z.string().min(1, "You need to enter instructions"),
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
      ingredients: [{ name: "", quantity: "" }],
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
        <input type="text" {...register("nameRecipe")} />
        {errors.nameRecipe && (
          <p style={{ color: "red" }}>{errors.nameRecipe.message}</p>
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
        <input type="text" {...register("image")} />
        {errors.image && (
          <p style={{ color: "red" }}>{errors.image.message}</p>
        )}
      </div>

      <div className={styles.Ingredients}>
        <label>Ingredients</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Controller
              control={control}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  placeholder="Ingredient name"
                />
              )}
            />
            {errors.ingredients?.[index]?.name && (
              <p style={{ color: "red" }}>
                {errors.ingredients[index].name?.message}
              </p>
            )}

            <Controller 
              control={control}
              name={`ingredients.${index}.quantity`}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  placeholder="Ingredient quantity"
                />
              )}
            />
            {errors.ingredients?.[index]?.quantity && (
              <p style={{ color: "red" }}>
                {errors.ingredients[index].quantity?.message}
              </p>
            )}

            {index === fields.length - 1 && (
              <button type="button" onClick={() => append({ name: "", quantity: "" })}>
                +
              </button>
            )}
          </div>
        ))}
        {errors.ingredients && (
          <p style={{ color: "red" }}>{errors.ingredients.message}</p>
        )}
      </div>

      <div className={styles.Instructions}>
        <label>Instructions</label>
        <textarea {...register("preparationInstructions")} />
        {errors.preparationInstructions && (
          <p style={{ color: "red" }}>{errors.preparationInstructions.message}</p>
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
