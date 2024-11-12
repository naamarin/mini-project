"use client";
import { useForm, Controller, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from '@/components/FromRecipe/FormRecipe.module.css';
import { postRecipe } from "@/services/recipes";

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

export type RecipeFormData = z.infer<typeof recipeSchema>;

const FormRecipe = () => {
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
    postRecipe(data);
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className={styles.label}>Meal name:</label>
        <input
          type="text"
          {...register("nameRecipe")}
          className={styles.input}
        />
        {errors.nameRecipe && (
          <p style={{ color: "red" }}>{errors.nameRecipe.message}</p>
        )}
      </div>

      <div>
        <label className={styles.label}>Category:</label>
        <label>
          <select className={styles.selectInput} {...register("category")}>
            <option value="" disabled selected></option>
            <option className={styles.optionText} value="Breakfast">
              Breakfast
            </option>
            <option className={styles.optionText} value="Pasta">
              Pasta
            </option>
            <option className={styles.optionText} value="Salad">
              Salad
            </option>
            <option className={styles.optionText} value="Main course">
              Main course
            </option>
            <option className={styles.optionText} value="Dessert">
              Dessert
            </option>
          </select>
        </label>
        {errors.category && (
          <p className={styles.errorMessage}>{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className={styles.label}>Image URL:</label>
        <input type="text" {...register("image")} className={styles.input} />
        {errors.image && (
          <p style={{ color: "red" }}>{errors.image.message}</p>
        )}
      </div>

      <div className={styles.ingredients}>
        <label className={styles.label}>Ingredients:</label>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.flex}>
            <Controller
              control={control}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <input
                  className={styles.inputName}
                  type="text"
                  {...field}
                  placeholder="name"
                />
              )}
            />
            {errors.ingredients?.[index]?.name && (
              <p className={styles.errorMessage}>
                {errors.ingredients[index].name?.message}
              </p>
            )}
            <Controller
              control={control}
              name={`ingredients.${index}.quantity`}
              render={({ field }) => (
                <input
                  className={styles.inputQuantity}
                  type="text"
                  {...field}
                  placeholder="quantity"
                />
              )}
            />
            {errors.ingredients?.[index]?.quantity && (
              <p className={styles.errorMessage}>
                {errors.ingredients[index].quantity?.message}
              </p>
            )}
            {index === fields.length - 1 && (
              <button
                type="button"
                onClick={() => append({ name: "", quantity: "" })}
                className={styles.btn}
              >
                <span className={styles.text}>+</span>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.Instructions}>
        <label className={styles.label}>Instructions:</label>
        <textarea {...register("preparationInstructions")} />
        {errors.preparationInstructions && (
          <p style={{ color: "red" }}>
            {errors.preparationInstructions.message}
          </p>
        )}
      </div>

      <div className={styles.flex}>
        <button
          type="button"
          className={`${styles.fancy} ${styles.back}`}
          onClick={() => (window.location.href = "../recipes")}
        >
          <div className={styles["arrow-wrapper"]}>
            <div className={styles.arrow}></div>
          </div>
          <span className={styles.text}>Back</span>
        </button>
        <button type="submit" className={styles.fancy}>
          <span className={styles.text}>Add</span>
          <div className={styles["arrow-wrapper"]}>
            <div className={styles.arrow}></div>
          </div>
        </button>
      </div>
    </form>
  );
};

export default FormRecipe


