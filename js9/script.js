document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('seminarTable');

  table.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'TD') {
      const row = target.parentElement;
      const cells = row.cells;
      const dayColIndex = 0;
      const beginColIndex = 1;
      const endColIndex = 2;
      const topicColIndex = 3;

      // Get day text: if rowspan used, cell might be empty here, so look upwards
      function getDay(cell, currRow) {
        if (cell && cell.textContent.trim()) {
          return cell.textContent.trim();
        }
        // Look in previous rows for day cell with rowspan
        let prevRow = currRow.previousElementSibling;
        while (prevRow) {
          let dayCell = prevRow.cells[dayColIndex];
          if (dayCell && dayCell.rowSpan > 1 && dayCell.textContent.trim()) {
            return dayCell.textContent.trim();
          }
          prevRow = prevRow.previousElementSibling;
        }
        return '(unknown day)';
      }

      const day = getDay(row.cells[dayColIndex], row);
      
      // To safely get content from cells, accounting for rowspan cells missing on this row
      function getCellText(index){
        if(cells[index] && cells[index].textContent.trim()) return cells[index].textContent.trim();
        // Look in previous rows for cell with rowspan
        let prevRow = row.previousElementSibling;
        while(prevRow){
          const prevCells = prevRow.cells;
          if(prevCells[index] && prevCells[index].rowSpan > 1){
            return prevCells[index].textContent.trim();
          }
          prevRow = prevRow.previousElementSibling;
        }
        return '(not specified)';
      }

      const begin = getCellText(beginColIndex);
      const end = getCellText(endColIndex);
      const topic = getCellText(topicColIndex);

      const clickedColIndex = target.cellIndex;

      let message = '';

      switch (clickedColIndex) {
        case dayColIndex:
          message = `Day: ${day}`;
          break;
        case beginColIndex:
          message = `Day: ${day}\nSchedule begins at: ${begin}`;
          break;
        case endColIndex:
          message = `Day: ${day}\nSchedule ends at: ${end}`;
          break;
        case topicColIndex:
          message = topic
            ? `Day: ${day}\nTopic: ${topic}`
            : `Day: ${day}\nNo topic scheduled.`;
          break;
        default:
          message = `Day: ${day}`;
      }

      alert(message);
    }
  });
});
