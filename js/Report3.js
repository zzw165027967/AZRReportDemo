/**
 * @author Jackey.Zhuang
 */
function drawReport03Visualization()
{
	// Create and populate the data table.
	var data = new google.visualization.DataTable({
		cols : [{ id : '', label : 'Ontvanger', type : 'string'
			}, { id : '', label : 'Verzender', type : 'string'
			}, { id : '', label : 'Foutcode', type : 'string'
			}, { id : '', label : 'Omschrijving ', type : 'string'
			}, { id : '', label : 'Aantal', type : 'number'
			}],
		rows : [{c:[{v: '5514'}, {v: '123'}, {v: '9074'}, {v: 'Omschrijving'}, {v: 15}]},
              {c:[{v: '5517'}, {v: '123'}, {v: '9018'}, {v: 'Omschrijving'}, {v: 25}]},
              {c:[{v: '5517'}, {v: '321'}, {v: '9057'}, {v: 'Omschrijving'}, {v: 1}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '9074'}, {v: 'Omschrijving'}, {v: 5}]},
              {c:[{v: '5515'}, {v: '456'}, {v: '9018'}, {v: 'Omschrijving'}, {v: 7}]},
              {c:[{v: '5517'}, {v: '321'}, {v: '9057'}, {v: 'Omschrijving'}, {v: 6}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '9074'}, {v: 'Omschrijving'}, {v: 12}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '9018'}, {v: 'Omschrijving'}, {v: 10}]},
              {c:[{v: '5517'}, {v: '123'}, {v: '9057'}, {v: 'Omschrijving'}, {v: 9}]},
              {c:[{v: '5515'}, {v: '321'}, {v: '9074'}, {v: 'Omschrijving'}, {v: 2}]},
              {c:[{v: '5516'}, {v: '123'}, {v: '9018'}, {v: 'Omschrijving'}, {v: 2}]},
              {c:[{v: '5517'}, {v: '123'}, {v: '9057'}, {v: 'Omschrijving'}, {v: 8}]},
              ]
		});
		
	// Maak filters
    // Maak een filter aan voor 'Ontvanger'
    var categoryPickerOntvanger = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'ctrlOntvanger', 'options': { 'filterColumnLabel': 'Ontvanger'} }));
    // Maak een filter aan voor 'Type'
    var categoryPickerVerzender = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'ctrlVerzender', 'options': { 'filterColumnLabel': 'Verzender'} }));
    // Maak een filter aan voor 'Ontvanger'
    var categoryPickerFoutcode = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'ctrlFoutcode', 'options': { 'filterColumnLabel': 'Foutcode'} }));
    // Maak een filter aan voor 'Type'
    var categoryPickerAantal = new google.visualization.ControlWrapper(addDefaultRangeSelector({ 'containerId': 'ctrlAantal', 'options': { 'filterColumnLabel': 'Aantal'} }));
    

    // Maak een grafiek aan voor suppliers
    var graph1 = new google.visualization.ChartWrapper(addDefaultPieChart({ 'containerId': 'div1', 'options': { 'title': 'Aandeel per foutcode'} }));
    // Maak een grafiek aan voor suppliers
    var graph2 = new google.visualization.ChartWrapper(addDefaultPieChart({ 'containerId': 'div2', 'options': { 'title': 'Aandeel per zorgkantoor'} }));
    
    //Declareer table
    // Vul de tabel
    var table = new google.visualization.ChartWrapper(addDefaultTable({ 'containerId': 'tblData' }));
    
    var reportDash = new google.visualization.Dashboard(document.getElementById('dashboard')).
                bind([categoryPickerOntvanger, categoryPickerVerzender. categoryPickerFoutcode, categoryPickerAantal], [table]);
    
    
    //Register callbacks
    google.visualization.events.addListener(table, 'ready', redraw);
    
    
    // Maak het dashboard aan
    reportDash.draw(data);
    
    function redraw(event) {

        graph1.setDataTable(google.visualization.data.group(table.getDataTable(), [2],
		[{ 'column': 4, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

		graph2.setDataTable(google.visualization.data.group(table.getDataTable(), [1],
		[{ 'column': 4, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));
		
        graph1.draw();
        graph2.draw();
    }
    
}
