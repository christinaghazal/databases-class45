+------------------+        +------------------+
|   Categories    |        |   Ingredients    |
+------------------+        +------------------+
| category_id (PK) |        | ingredient_id (PK)|
| category_name    |        | ingredient_name   |
+------------------+        +------------------+
            |                         |
            |                         |
            v                         v
+------------------+        +------------------+
|     Recipes      |        |      Steps       |
+------------------+        +------------------+
| recipe_id (PK)   |        | step_id (PK)     |
| recipe_name      |        | step_desc         |
+------------------+        +------------------+
            |                         |
            |                         |
            v                         v
+------------------+        +------------------+
|Recipe_ingredients|        |Recipe_categories |
+------------------+        +------------------+
| recipe_id (FK)   |        | recipe_id (FK)   |
| ingredient_id (FK)|        | category_id (FK)|
+------------------+        +------------------+
            |
            |
            v
+------------------+
| Recipe_steps     |
+------------------+
| recipe_id (FK)   |
| step_id (FK)     |
+------------------+