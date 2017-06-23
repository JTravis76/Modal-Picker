$(document).ready(function () {
    var color = [{ Text: "Black", Value: "1" }, { Text: "Blue", Value: "2" }, { Text: "Green", Value: "3" }, { Text: "Red", Value: "4" }, { Text: "Silver", Value: "5" }];
    $('#btn-color-picker').click(function () {
        $('#txt-color').Picker({ title: 'Colors', data: color, showBlank: true });
    });
    $('#btn-multi-picker').click(function () {
        $('#div-pick').Picker({ id: 'MultiPicker', multiSelect: true });
    });
    $('#btn-ajax-picker').click(function () {
        $('#txt-ajax').Picker({ id: 'AjaxPicker', title: "Products", ajax: true, url: '' });
    });
});
//# sourceMappingURL=index.js.map