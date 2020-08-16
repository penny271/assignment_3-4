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
         working: true, //-作業中の状態をtrue, 完了の状態をfalseとする
      };

      tasks.push(task);
      //結果をブラウザ上に表示させる
      displayTasks();
   };

   //todoのタスクを作成及び結果をブラウザに表示
   const displayTasks = () => {
      document.querySelectorAll('.addedTr').forEach((tr) => {
         tr.remove();
      });
      tasks.forEach((each, index) => {
         const tr = document.createElement('tr');
         tr.classList.add('addedTr');
         const idTd = document.createElement('td');
         const commentTd = document.createElement('td');

         const conditionWorkingTd = document.createElement('td');
         conditionWorkingTd.classList.add('working');

         const conditionCompleteTd = document.createElement('td');
         conditionCompleteTd.classList.add('complete');

         const conditionDeleteTd = document.createElement('td');

         const buttonTabForWorking = document.createElement('button');
         const buttonTabForComplete = document.createElement('button');
         const buttonTabForDelete = document.createElement('button');

         //-オブジェクトのキーと値の状態でdisplayTasks()後もタスクの表示状態を維持する
         if (tasks[index].working === true) {
            conditionCompleteTd.classList.add('hidden');
            conditionCompleteTd.classList.toggle('complete');
            conditionWorkingTd.classList.remove('hidden');
         } else {
            conditionCompleteTd.classList.remove('hidden');
            conditionWorkingTd.classList.add('hidden');
            conditionWorkingTd.classList.toggle('working');
         }

         //¥削除機能:削除ボタンが押された時に押された要素を削除する
         conditionDeleteTd.addEventListener('click', () => {
            tasks.splice(index, 1);
            displayTasks();
            //return;
         });

         //^作業中ボタンを押したときにタスクの状態を変える
         conditionWorkingTd.addEventListener('click', () => {
            conditionWorkingTd.classList.add('hidden');
            conditionWorkingTd.classList.remove('working');
            conditionCompleteTd.classList.remove('hidden');
            conditionCompleteTd.classList.add('complete');

            tasks[index].working = false;
         });

         //^完了ボタンを押したときにタスクの状態を変える
         conditionCompleteTd.addEventListener('click', () => {
            conditionWorkingTd.classList.remove('hidden');
            conditionWorkingTd.classList.add('working');
            conditionCompleteTd.classList.add('hidden');
            conditionCompleteTd.classList.remove('complete');

            tasks[index].working = true;
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
         const form = document.getElementsByName('radioConditions');

         //-ラジオボタンを押した後の各挙動_すべてを押した場合
         const activateAll = () => {
            const trHiddenTargets = document.querySelectorAll('tr.hidden'); //-NEW
            trHiddenTargets.forEach((hid) => {
               hid.classList.remove('hidden');
            });
         };

         //-ラジオボタンを押した後の各挙動_作業中を押した場合
         const activateWorking = () => {
            const classCompleteTargets = document.querySelectorAll('.complete');
            const classWorkingTargets = document.querySelectorAll('.working'); //! .working　忘れ//-NEW
            classWorkingTargets.forEach((work) => {
               if (work.parentNode.classList.contains('hidden')) {
                  work.parentNode.classList.remove('hidden');
               }
            });
            classCompleteTargets.forEach((complete) => {
               complete.parentNode.classList.add('hidden');
            });
         };

         //-ラジオボタンを押した後の各挙動_完了を押した場合
         const activateComplete = () => {
            const classCompleteTargets = document.querySelectorAll('.complete');
            const classWorkingTargets = document.querySelectorAll('.working');
            classWorkingTargets.forEach((work) => {
               work.parentNode.classList.add('hidden');
               // work.ParentNode.classList.add('hidden');
            });
            classCompleteTargets.forEach((complete) => {
               complete.parentNode.classList.remove('hidden');
            });
         };

         //-ラジオボタンの選択及び条件に応じた関数の実行
         document.querySelector('form').addEventListener('click', (event) => {
            const element = event.target;
            const elementJob = element.attributes.job.value;

            if (elementJob === 'ALL') {
               activateAll();
            }
            if (elementJob === 'WORKING') {
               activateWorking();
            }
            if (elementJob === 'COMPLETE') {
               activateComplete();
            }
         });
      });
   };

   //追加ボタンクリック時にaddTask()を走らせる
   addTaskTrigger.addEventListener('click', () => {
      addTask();
      input.value = '';
   });
   document.getElementById('input').addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
         addTask();
         input.value = '';
      }
   });
}
