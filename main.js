'use strict';

{
   const addTaskTrigger = document.getElementById('addBtn');
   const addTaskTarget = document.getElementById('addTaskTarget');
   const input = document.getElementById('input');

   let idNum = 0;

   let tasks = [];
   //追加ボタンクリック時の詳細な挙動
   const addTask = () => {
      let task = {
         id: idNum,
         comment: input.value,
      };

      tasks.push(task);
      //結果をブラウザ上に表示させる
      displayTasks();
   };

   //todoのタスクを作成及び結果をブラウザに表示
   const displayTasks = () => {
      //¥初期化処理 - ここでブラウザに表示されるtrを
      //¥全て削除することで画面上タスクを見えなくする
      document.querySelectorAll('.addedTr').forEach((tr) => {
         tr.remove();
      });
      tasks.forEach((each, index) => {
         const tr = document.createElement('tr');
         tr.classList.add('addedTr');
         const idTd = document.createElement('td');
         const commentTd = document.createElement('td');

         const conditionWorkingTd = document.createElement('td');
         conditionWorkingTd.classList.add('working'); //-NEW

         const conditionCompleteTd = document.createElement('td');

         const conditionDeleteTd = document.createElement('td');

         const buttonTabForWorking = document.createElement('button');
         const buttonTabForComplete = document.createElement('button');
         const buttonTabForDelete = document.createElement('button');
         conditionCompleteTd.classList.add('hidden');

         //¥削除機能:削除ボタンが押された時に押された要素を削除する
         conditionDeleteTd.addEventListener('click', () => {
            tasks.splice(index, 1);
            displayTasks();
            //return;
         });

         //^作業中ボタンを押したときにタスクの状態を変える
         conditionWorkingTd.addEventListener('click', () => {
            conditionWorkingTd.classList.add('hidden');
            conditionWorkingTd.classList.remove('working'); //-NEW
            conditionCompleteTd.classList.remove('hidden');
            conditionCompleteTd.classList.add('complete'); //-NEW
         });

         //^完了ボタンを押したときにタスクの状態を変える
         conditionCompleteTd.addEventListener('click', () => {
            conditionWorkingTd.classList.remove('hidden');
            conditionWorkingTd.classList.add('working'); //-NEW
            conditionCompleteTd.classList.add('hidden');
            conditionCompleteTd.classList.remove('complete'); //-NEW
         });

         //-DOM操作＿描画
         addTaskTarget.appendChild(tr);
         tr.appendChild(idTd); // 1つめ
         idTd.textContent = index;

         tr.appendChild(commentTd); // 2つ目
         commentTd.textContent = tasks[index].comment; // タスク入力値

         tr.appendChild(conditionWorkingTd); // 3つ目
         conditionWorkingTd.appendChild(buttonTabForWorking);
         buttonTabForWorking.textContent = '作業中';

         tr.appendChild(conditionCompleteTd); // 3つ目※
         conditionCompleteTd.appendChild(buttonTabForComplete);
         buttonTabForComplete.textContent = '完了';

         tr.appendChild(conditionDeleteTd); // 4つ目
         conditionDeleteTd.appendChild(buttonTabForDelete);
         buttonTabForDelete.textContent = '削除';

         //- タスク表示、非表示切り替え機能
         const radioButtons = document.querySelectorAll('input');

         for (let i = 0; i < document.radioConditions.rdo.length; i++) {
            radioButtons[i].addEventListener('click', () => {
               const workingStateTargets = document.querySelectorAll(
                  '.working'
               );
               const completeStateTargets = document.querySelectorAll(
                  '.complete'
               );
               const trHiddenTargets = document.querySelectorAll('tr.hidden');
               if (radioButtons[0].checked) {
                  trHiddenTargets.forEach((hid) => {
                     hid.classList.remove('hidden');
                  });
               }
               if (radioButtons[1].checked) {

                  completeStateTargets.forEach((CompleteTarget) => {
                     CompleteTarget.closest('tr').classList.add('hidden');
                  });
                  workingStateTargets.forEach((workingTarget) => {
                     workingTarget.closest('tr').classList.remove('hidden');
                  });
               }
               if (radioButtons[2].checked) {
                  workingStateTargets.forEach((workingTarget) => {
                     workingTarget.closest('tr').classList.add('hidden');
                  });
                  completeStateTargets.forEach((CompleteTarget) => {
                     CompleteTarget.closest('tr').classList.remove('hidden');
                  });
               }
            });
         }
      });
   };

   //追加ボタンクリック時にaddTask()を走らせる
   addTaskTrigger.addEventListener('click', () => {
      addTask();
      input.value = '';
   });
}
