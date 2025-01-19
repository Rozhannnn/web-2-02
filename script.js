document.addEventListener('DOMContentLoaded', function () {
    let caloriesConsumed = 0;
    let caloriesBurned =0;
    let dailyLimit =0;
  
    const caloriesLimitElement = document.getElementById('CaloriesLimitOfDay');
    const caloriesJameElement = document.getElementById('CaloriesJame');
    const caloriesEatElement = document.getElementById('CaloriesEat');
    const caloriesSozElement = document.getElementById('CaloriesSoz');
    const caloriesMandeElement = document.getElementById('CaloriesMande');
    const progressBar = document.getElementById('calorie-progress');
  
    function updateCalorieStats() {
      caloriesLimitElement.textContent = dailyLimit;
      caloriesJameElement.textContent = caloriesConsumed;
      caloriesEatElement.textContent = caloriesConsumed;
      caloriesSozElement.textContent = caloriesBurned;
      caloriesMandeElement.textContent = dailyLimit - caloriesConsumed;
  
      const progress = (caloriesConsumed / dailyLimit) * 100;
      progressBar.style.width = `${progress}%`;
    }
  
    function addFood(calorieValue) {
      const foodName = document.getElementById('foodInput').value.trim();
      if (foodName) {
        const ul = document.getElementById('foodList');
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.textContent = `${foodName} - ${calorieValue} cal`;
  
        const removeButton = document.createElement('button');
        removeButton.classList.add('fa', 'fa-remove');
        removeButton.addEventListener('click', () => {
          li.remove();
          caloriesConsumed -= calorieValue;
          updateCalorieStats();
        });
  
        li.appendChild(removeButton);
        ul.appendChild(li);
  
        document.getElementById('foodInput').value = '';
        caloriesConsumed += calorieValue;
        updateCalorieStats();
      }
    }
  
    function addExercise(calorieValue) {
      const exerciseName = document.getElementById('exerciseInput').value.trim();
      if (exerciseName) {
        const ul = document.getElementById('exerciseList');
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.textContent = `${exerciseName} - ${calorieValue} cal`;
  
        const removeButton = document.createElement('button');
        removeButton.classList.add('fa', 'fa-remove');
        removeButton.addEventListener('click', () => {
          li.remove();
          caloriesBurned -= calorieValue;
          updateCalorieStats();
        });
  
        li.appendChild(removeButton);
        ul.appendChild(li);
  
        document.getElementById('exerciseInput').value = '';
        caloriesBurned += calorieValue;
        updateCalorieStats();
      }
    }
  
    document.getElementById('addFoodBtn').addEventListener('click', function() {
      const calorieValue = 100;
      addFood(calorieValue);
    });
  
    document.getElementById('addExerciseBtn').addEventListener('click', function() {
      const calorieValue = 50;
      addExercise(calorieValue);
    });
  
    document.getElementById('reset').addEventListener('click', () => {
      caloriesConsumed = 0;
      caloriesBurned = 0;
      updateCalorieStats();
  
      const allLists = document.querySelectorAll('#foodList, #exerciseList');
      allLists.forEach(ul => {
        ul.innerHTML = '';
      });
    });
  
    document.getElementById('setLimitBtn').addEventListener('click', function () {
      const newLimit = prompt("Please enter your daily calorie limit:", dailyLimit);
  
      if (newLimit !== null && !isNaN(newLimit) && newLimit > 0) {
        dailyLimit = parseInt(newLimit);
        updateCalorieStats();
      } else {
        alert("Please enter a valid calorie limit.");
      }
    });
  
    document.getElementById('foodFilter').addEventListener('input', function() {
      const filter = this.value.toLowerCase();
      const items = document.querySelectorAll('#foodList .list-item');
  
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? 'block' : 'none';
      });
    });
  
    document.getElementById('exerciseFilter').addEventListener('input', function() {
      const filter = this.value.toLowerCase();
      const items = document.querySelectorAll('#exerciseList .list-item');
  
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? 'block' : 'none';
      });
    });
  
    updateCalorieStats();
  });
  