/**
 * @jest-environment jsdom
 */

describe('UserLearning', () => {
  var ul;

  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    require('./user-learning.js');
    ul = global.UserLearning;
  });

  test('should initialize with default data', () => {
    expect(ul.initialized).toBe(true);
    expect(ul.data.feedbacks).toEqual([]);
    expect(ul.getTotalFeedbacks()).toBe(0);
  });

  test('should register recipe like', () => {
    ul.registrarLikeReceta('rec_001', 'Huevos keto', ['huevo', 'aguacate']);
    expect(ul.getTotalFeedbacks()).toBe(1);
    expect(ul.isRecipeLiked('rec_001')).toBe(true);
  });

  test('should register recipe dislike', () => {
    ul.registrarDislikeReceta('rec_002', 'Arroz', ['arroz']);
    expect(ul.isRecipeDisliked('rec_002')).toBe(true);
  });

  test('should boost liked ingredient preference', () => {
    ul.registrarLikeIngrediente('aguacate');
    expect(ul.getIngredientPreference('aguacate')).toBeGreaterThan(0);
    expect(ul.isIngredientLiked('aguacate')).toBe(true);
  });

  test('should penalize disliked ingredient', () => {
    ul.registrarDislikeIngrediente('pan');
    expect(ul.getIngredientPreference('pan')).toBeLessThan(0);
  });

  test('calculateRecipeScore should penalize disliked recipes', () => {
    var recipe = { id: 'rec_dis', title: 'Mala', ingredients: [{ name: 'pan' }] };
    var scoreBefore = ul.calculateRecipeScore(recipe);
    expect(scoreBefore).toBe(100);

    ul.registrarDislikeReceta('rec_dis', 'Mala', ['pan']);
    var scoreAfter = ul.calculateRecipeScore(recipe);
    expect(scoreAfter).toBeLessThan(scoreBefore);
  });

  test('calculateRecipeScore with liked recipe stays at 100 (capped)', () => {
    var recipe = { id: 'rec_liked', title: 'Buena', ingredients: [{ name: 'pollo' }] };
    var scoreBefore = ul.calculateRecipeScore(recipe);
    expect(scoreBefore).toBe(100);
    ul.registrarLikeReceta('rec_liked', 'Buena', ['pollo']);
    var scoreAfter = ul.calculateRecipeScore(recipe);
    expect(scoreAfter).toBe(100);
  });

  test('getRecetasMasGustadas returns liked recipes sorted by count', () => {
    ul.registrarLikeReceta('rec_a', 'A', []);
    ul.registrarLikeReceta('rec_b', 'B', []);
    ul.registrarLikeReceta('rec_a', 'A', []);
    var top = ul.getRecetasMasGustadas(5);
    expect(top.length).toBe(2);
    expect(top[0].id).toBe('rec_a');
    expect(top[0].likes).toBe(2);
  });
});
