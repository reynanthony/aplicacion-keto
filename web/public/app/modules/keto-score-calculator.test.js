/**
 * @jest-environment jsdom
 */

describe('KetoScoreCalculator', () => {
  var calc;

  beforeAll(() => {
    global.KETO_RECIPES = {};
    require('./keto-score-calculator.js');
    calc = global.KetoScoreCalculator;
  });

  test('should calculate recipe score for keto-friendly recipe', () => {
    var recipe = {
      id: 'test_001',
      title: 'Huevos con aguacate',
      calories: 400,
      protein: 20,
      fat: 35,
      carbs: 5,
      netCarbs: 3,
      ingredients: [
        { name: 'Huevo', quantity: 2, unit: 'pieza' },
        { name: 'Aguacate', quantity: 100, unit: 'g' }
      ]
    };
    var score = calc.calculateRecipeScore(recipe);
    expect(score.totalScore).toBeGreaterThan(30);
    expect(typeof score.nivel).toBe('string');
    expect(typeof score.esAptoKeto).toBe('boolean');
  });

  test('should score high-carb recipe lower than keto recipe', () => {
    var ketoRecipe = {
      id: 'test_001',
      title: 'Keto',
      calories: 400,
      protein: 20,
      fat: 35,
      carbs: 5,
      netCarbs: 3,
      ingredients: [{ name: 'Huevo', quantity: 2, unit: 'pieza' }]
    };
    var carbyRecipe = {
      id: 'test_002',
      title: 'Carby',
      calories: 500,
      protein: 10,
      fat: 5,
      carbs: 80,
      netCarbs: 75,
      ingredients: [{ name: 'Arroz', quantity: 200, unit: 'g' }]
    };
    var ketoScore = calc.calculateRecipeScore(ketoRecipe);
    var carbyScore = calc.calculateRecipeScore(carbyRecipe);
    expect(ketoScore.totalScore).toBeGreaterThan(carbyScore.totalScore);
  });

  test('should complete in under 50ms for 100 recipes', () => {
    var recipes = [];
    for (var i = 0; i < 100; i++) {
      recipes.push({
        id: 'perf_' + i,
        title: 'Recipe ' + i,
        calories: 200 + i,
        protein: 15,
        fat: 20,
        carbs: 5,
        netCarbs: 3,
        ingredients: [{ name: 'Pollo', quantity: 100, unit: 'g' }]
      });
    }
    var start = Date.now();
    recipes.forEach(function(r) { calc.calculateRecipeScore(r); });
    var elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(50);
  });

  test('should sum macros from ingredients', () => {
    var ingredients = [
      { name: 'Aceite de oliva', quantity: 30, unit: 'g', calories: 265, fat: 30 },
      { name: 'Pechuga de pollo', quantity: 200, unit: 'g', calories: 330, protein: 62, fat: 7 }
    ];
    var macros = calc.sumMacros(ingredients);
    expect(macros.calories).toBeGreaterThan(0);
    expect(macros.protein).toBeGreaterThan(0);
  });
});
