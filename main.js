var dataPoints;

/**
 * @description              Load CSV-file data
 */
function load() {
	if (!(file = document.getElementById('inputfile').files[0])) 
        return;

	let reader = new FileReader(); 
	reader.onload = function(evt) { 
        let chart = new ClassTable();
        chart.build(evt.target.result);
        chart.show();
	}
	reader.readAsText(file);
} // load();

