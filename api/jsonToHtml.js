function generateTable(data) {
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => Object.values(obj));
  const tableRows = rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
  const tableHTML = `
    <table>
      <thead>
        <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
  return tableHTML;
}

module.exports = { generateTable }
