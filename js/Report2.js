/**
 * @author Jackey.Zhuang
 */
function drawReport02Visualization()
{
	// Create and populate the data table.
	var data = new google.visualization.DataTable({
		cols : [{ id : '', label : 'Periode', type : 'string'
			}, { id : '', label : 'Year', type : 'number'
			}, { id : '', label : 'Type', type : 'string'
			}, { id : '', label : 'Versie', type : 'string'
			}, { id : '', label : 'Verzender', type : 'string'
			}, { id : '', label : 'Ontvanger', type : 'string'
			}, { id : '', label : 'Aantal', type : 'number'
			}],
		rows : [{c:[{v: 'Jan'}, {v: '2013'}, {v: 'AW33'}, {v: '1.1'}, {v: '5517'}, {v: '5504'}, {v: 15}]},
              {c:[{v: 'Feb'}, {v: '2013'}, {v: 'AW35'}, {v: '1.2'}, {v: '5517'}, {v: '5504'}, {v: 25}]},
              {c:[{v: 'Mar'}, {v: '2013'}, {v: 'AW39'}, {v: '1.4'}, {v: '5517'}, {v: '5504'}, {v: 1}]},
              {c:[{v: 'Apr'}, {v: '2013'}, {v: 'AW33'}, {v: '1.5'}, {v: '5517'}, {v: '5504'}, {v: 5}]},
              {c:[{v: 'May'}, {v: '2013'}, {v: 'AW35'}, {v: '1.3'}, {v: '5517'}, {v: '5504'}, {v: 7}]},
              {c:[{v: 'Jun'}, {v: '2013'}, {v: 'AW39'}, {v: '1.2'}, {v: '5517'}, {v: '5504'}, {v: 6}]},
              {c:[{v: 'Jul'}, {v: '2013'}, {v: 'AW33'}, {v: '1.3'}, {v: '5517'}, {v: '5504'}, {v: 12}]},
              {c:[{v: 'Aug'}, {v: '2013'}, {v: 'AW35'}, {v: '1.3'}, {v: '5517'}, {v: '5504'}, {v: 10}]},
              {c:[{v: 'Sep'}, {v: '2013'}, {v: 'AW39'}, {v: '1.1'}, {v: '5517'}, {v: '5504'}, {v: 9}]},
              {c:[{v: 'Oct'}, {v: '2013'}, {v: 'AW33'}, {v: '1.3'}, {v: '5517'}, {v: '5504'}, {v: 2}]},
              {c:[{v: 'Nov'}, {v: '2013'}, {v: 'AW35'}, {v: '1.1'}, {v: '5517'}, {v: '5504'}, {v: 2}]},
              {c:[{v: 'Dec'}, {v: '2013'}, {v: 'AW39'}, {v: '1.2'}, {v: '5517'}, {v: '5504'}, {v: 8}]},
              ]
		});
		
	// Maak filters
    // Maak een filter aan voor 'Ontvanger'
    var categoryPickerPeriode = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'ctrlPeriode', 'options': { 'filterColumnLabel': 'Periode'} }));
    // Maak een filter aan voor 'Type'
    var categoryPickerYear = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'ctrlYear', 'options': { 'filterColumnLabel': 'Year'} }));
    // Maak een filter aan voor 'Ontvanger'
    var categoryPickerVerzender = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'ctrlVerzender', 'options': { 'filterColumnLabel': 'Verzender'} }));
    // Maak een filter aan voor 'Type'
    var categoryPickerOntvanger = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'ctrlOntvanger', 'options': { 'filterColumnLabel': 'Ontvanger'} }));
    
    
    // Maak een grafiek aan voor suppliers
    var aw33chartSupplier = new google.visualization.ChartWrapper(addDefaultLineChart({ 'containerId': 'divperiode', 'options': { 'title': 'Aantal berichten per periode'} }));
    // Maak een grafiek aan voor suppliers
    var aw35chartSupplier = new google.visualization.ChartWrapper(addDefaultPieChart({ 'containerId': 'divtype', 'options': { 'title': 'Aandeel per type'} }));
    // Maak een grafiek aan voor suppliers
    var aw39chartSupplier = new google.visualization.ChartWrapper(addDefaultPieChart({ 'containerId': 'divperiodetotal', 'options': { 'title': 'Aandeel per periode'} }));
    
    //Declareer table
    // Vul de tabel
    var table = new google.visualization.ChartWrapper(addDefaultTable({ 'containerId': 'tblData' }));
    
    var reportDash = new google.visualization.Dashboard(document.getElementById('dashboard')).
                bind([categoryPickerPeriode, categoryPickerYear. categoryPickerVerzender, categoryPickerOntvanger], [table]);
    
    
    //Register callbacks
    google.visualization.events.addListener(table, 'ready', redraw);
    
    
    // Maak het dashboard aan
    reportDash.draw(data);
    
    function redraw(event) {

     	aw33chartSupplier.setDataTable(google.visualization.data.group(table.getDataTable(), [0],
		[{ 'column': 6, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

        aw35chartSupplier.setDataTable(google.visualization.data.group(table.getDataTable(), [2],
		[{ 'column': 6, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

		aw39chartSupplier.setDataTable(google.visualization.data.group(table.getDataTable(), [0],
		[{ 'column': 6, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));
		
        aw33chartSupplier.draw();
        aw35chartSupplier.draw();
        aw39chartSupplier.draw();
    }
    
}
