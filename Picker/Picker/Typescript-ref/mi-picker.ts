/*!
* PORTS.Picker v1.2.9
* -jQuery +
* -Bootstrap v3.3.7
*
* v1.1.0 - 2/23/2017: added feature to search list 
* v1.2.0 - 3/02/2017: ability to add a list of buttons to a DIV tag
* v1.2.1 - 3/07/2017: add multiSelect option. When using DIVs, you can build a list of buttons and pre-select the item without opening and closing the model.
* v1.2.2 - 3/21/2017: Add isSubModal option. When using picker as a parent modal, upon close removes the class="modal-open" from the <body> tag to allow scrolling on the main page.
* v1.2.3 - 3/22/2017: Truncate text longer than 30 characters
* v1.2.4 - 4/11/2017: BUG FIXES, 
                        - Relocate AJAX after the intital check for existing modal picker. AJAX calls were made on every call instead of the 1st call only. 
                        - Relocate the onSelected callback function within the button click event to fired once a selection was made.
                        - When Searching, not able to merge simple ({Value: '', Text: ''}) model to filtered array.
v1.2.5 - 5/15/2017: Added feature, Bootstrap's tooltip to display additional information for each item.
						- NOTE: Since MS SelectListItem class doesn't inculde the "Title" property, must use a anyomus type class object ({Value: '', Text: '', Title: ''}) to build model.
					Renamed the 'callback' option to 'onSelected' to provide better understanding and usability.
v1.2.6 - 6/12/2017: Added option to insert a blank item at top of list. Use option showBlank: true,
v1.2.7 - 8/23/2017: Set default focus to search box upon opening modal window
v1.2.8 - 8/30/2017: Option to display "disabled" items via CSS style while allowing the user to select it.
v1.2.9 - 5/30/2018: Fix bug when using Value = "0000" not creating the blank reset value = "0"
*/

if (typeof jQuery === 'undefined') {
    throw new Error('This plugin requires jQuery.')
}

// This protects the $ Alias and adds Scope
(function ($) {

    $.fn.Picker = function (options) {

        var defaults = {
            id: "MyModal",
            title: "Title Goes Here",
            group: null,
            data: sampleData,
            buttonTemplate: null,
            ajax: false,
            url: null,
            multiSelect: false,
            isSubModal: false,
            showBlank: false,
            onSelected: function () { }
        };

        var settings = $.extend({}, defaults, options);

        // Using "return this.each()" makes the plugin chainable
        return this.each(function () {

            var TargetId = this.id;
            var TargetType = this.tagName;

            //build a list a preSelected buttons
            var btnList = [];
            if (TargetType.toLowerCase() == 'div') {
                $('#' + TargetId).find('button').each(function () {
                    btnList.push({ id: $(this).data('id') });
                });
            }

            //if modal already exist, just display it
            if ($('#' + settings.id).length) {
                //console.log(btnList);
                $('#' + settings.id).find('table tr').each(function () {
                    var btn = $(this).find('button');
                    $(btn).removeClass('btn-success').addClass('btn-primary');
                    $(btn).find('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');

                    //loop through array and set matching Ids
                    for (var r = 0; r < btnList.length; r++) {
                        if (btnList[r].id == $(btn).attr('data-id')) {
                            $(btn).removeClass('btn-primary').addClass('btn-success');
                            $(btn).find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                        }
                    }
                });

                //display modal
                $('#' + settings.id).modal('show');
                //set focus to search box
                $('#' + settings.id + '-search').focus();

                //if (typeof settings.beforeOpen == 'function') {
                //    settings.beforeOpen.call();
                //}

                return;
            } else {
                //If active, getpicker data via ajax
                if (settings.ajax) {
                    if (settings.url != null) {

                        $.ajax({
                            url: settings.url,
                            type: "GET",
                            cache: false,
                            async: false,
                            data: { group: settings.group },
                            success: function (data) {
                                settings.data = JSON.parse(data);
                                //console.log(settings.data);

                                //if (settings.data.length > 0) {
                                //    var t = settings.data[0].Text;
                                //    var v = settings.data[0].Value;
                                //    var g = settings.data[0].Group;
                                //    var s = settings.data[0].Selected;
                                //    var d = settings.data[0].Disabled;
                                //    //debugger
                                //}
                            },
                            error: function () {
                                alert("Invaild URL!");
                            }
                        });

                    }
                }
            }

            var body = $('body');

            var divModal = document.createElement('div');
            divModal.id = settings.id;
            divModal.setAttribute('role', 'dialog');
            $(divModal).addClass('modal');

            var divDialog = document.createElement('div');
            $(divDialog).addClass('modal-dialog modal-sm modal-sub');
            $(divDialog).css('margin-top', '150px');

            var divHeader = document.createElement('div');
            $(divHeader).addClass('modal-content').html('<div class="modal-header"><button type="button" class="close" aria-hidden="true">&times;</button><h4 class="modal-title">' + settings.title + '</h4></div>');


            $(divHeader).find('button').click(function () {
                closeMe();
            });

            var divContent = document.createElement('div');
            $(divContent).addClass('modal-content');

            var textbox = document.createElement('input');
            textbox.id = settings.id + '-search';
            $(textbox).attr('type', 'text').attr('placeholder', 'Search...').addClass('form-control');
            $(textbox).keydown(function (e) {
                //13 = Enter key
                if (e.keyCode == 13) {
                    var search = $('#' + textbox.id).val();

                    var filteredData = [];

                    for (var r = 0; r < settings.data.length; r++) {
                        var str = settings.data[r].Text.toLowerCase();

                        if (str.indexOf(search.toLowerCase()) != -1) {
                            //var newRow = {
                            //    //TODO: Sometime a simple model is used, need to 1st check schema before
                            //    // coping to filteredData array
                            //    Disabled: settings.data[r].Disabled,
                            //    Group: {
                            //        Disabled: settings.data[r].Group.Disabled,
                            //        Name: settings.data[r].Group.Name
                            //    },
                            //    Selected: settings.data[r].Selected,
                            //    Text: settings.data[r].Text,
                            //    Value: settings.data[r].Value
                            //}
                            var newRow: any = {};
                            newRow.Disabled = settings.data[r].Disabled == undefined ? "" : settings.data[r].Disabled;
                            newRow.Group = settings.data[r].Group == undefined ? "" : settings.data[r].Group;
                            newRow.Selected = settings.data[r].Selected == undefined ? "" : settings.data[r].Selected;
                            newRow.Text = settings.data[r].Text == undefined ? "" : settings.data[r].Text;
                            newRow.Value = settings.data[r].Value == undefined ? "" : settings.data[r].Value;
                            //Tooltip title
                            newRow.Title = settings.data[r].Title == undefined ? "" : settings.data[r].Title;

                            filteredData.push(newRow);
                        }
                    }

                    RenderTableRows(filteredData);
                }
            });
            divContent.appendChild(textbox);

            var divOverflow = document.createElement('div');

            var table = document.createElement('table');
            $(table).addClass('table table-hover table-bordered table-condensed');

            var tbody = document.createElement('tbody');
            $(tbody).empty();

            RenderTableRows(settings.data);


            table.appendChild(tbody);
            divOverflow.appendChild(table);
            divContent.appendChild(divOverflow);
            divHeader.appendChild(divContent);
            divDialog.appendChild(divHeader);
            divModal.appendChild(divDialog);
            $(body).append(divModal);

            //Display the Modal window
            $('#' + settings.id).modal('show');

            //set focus to search box
            $('#' + settings.id + '-search').focus();

            //Init Bootstrap Tooltips
            setTooltips();


            /*== Function to rebuild the table with search results ==*/
            function RenderTableRows(data) {
                var id = settings.id;
                $('#' + id).find('tbody').empty();

                var totalRows = 0;
                if (data != null && data.length > 0) {

                    //ShowBlank - insert a blank option at beginning of list
                    if (data[0].Value != "0" && settings.showBlank === true) {
                        data.unshift({ Value: 0, Text: "" });
                    }

                    $(data).each(function () {
                        var row = tbody.insertRow();
                        $(row).empty();

                        var cell = row.insertCell();
                        $(cell).css({ 'text-align': 'center', 'width': '40px' });

                        var btn = document.createElement('button');
                        btn.setAttribute('data-name', this.Text);
                        btn.setAttribute('data-id', this.Value);

                        var preSelect = false;
                        for (var r = 0; r < btnList.length; r++) {
                            if (btnList[r].id == this.Value)
                                preSelect = true;
                        }

                        if (preSelect)
                            $(btn).addClass('btn btn-xs btn-success');
                        else
                            $(btn).addClass('btn btn-xs btn-primary');

                        if (settings.data[0].Group != null)
                            $(btn).addClass(this.Group.Name);


                        if (settings.buttonTemplate == null) {
                            if (preSelect)
                                btn.innerHTML = '<i class="glyphicon glyphicon-check"></i>';
                            else
                                btn.innerHTML = '<i class="glyphicon glyphicon-unchecked"></i>';
                        } else {
                            btn.innerHTML = settings.buttonTemplate;
                        }

                        $(btn).click(function () {
                            switch (TargetType.toLowerCase()) {
                                case "input":
                                    $('#' + TargetId).val($(this).data('name'));
                                    $('#' + TargetId).attr('data-name', $(this).data('name'));
                                    $('#' + TargetId).attr('data-id', $(this).data('id'));
                                    break;

                                case "div":
                                    $('#' + TargetId).append('<button type="button" class="btn btn-xs btn-danger RemoveListItem" style="margin:2px;" data-id="' + $(this).data('id') + '"><span class="glyphicon glyphicon-remove"></span> ' + $(this).data('name') + '</button>');
                                    //settings.multiSelect = true;
                                    break;
                            }

                            if (!settings.multiSelect) {
                                closeMe();
                            } else {
                                //toggle the button
                                if ($(this).hasClass("btn-primary")) {
                                    $(this).removeClass("btn-primary").addClass("btn-success");
                                    $(this).find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                                } else {
                                    $(this).removeClass("btn-success").addClass("btn-primary");
                                    $(this).find('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');

                                    //find matching button id and remove it
                                    $('.RemoveListItem').each(function () {
                                        if ($(btn).data('id') == $(this).data('id')) {
                                            $(this).remove();
                                        }
                                    });

                                }

                            }

                            //Do any callback once item is selected
                            if (typeof settings.onSelected == 'function') {
                                settings.onSelected.call();
                            }

                        });

                        cell.appendChild(btn);

                        cell = row.insertCell();
                        $(cell).attr('data-toggle', 'picker-tooltip').attr('title', this.Title);

                        if (this.Text.length > 30)
                            if (!this.Disabled)
                                cell.innerText = this.Text.substring(0, 30) + '...';
                            else {
                                $(cell).css({ "background-color": "mistyRose", "cursor": "not-allowed" });
                                cell.innerHTML = '<span style="color:red; font-decoration:line-through; font-style:italic;" >' + this.Text.substring(0, 30) + '</span>';
                            }

                        else
                            if (!this.Disabled)
                                cell.innerText = this.Text;
                            else {
                                $(cell).css({ "background-color": "mistyRose", "cursor": "not-allowed" });
                                cell.innerHTML = '<span style="color:red; font-decoration:line-through; font-style:italic;" >' + this.Text + '</span>';
                            }

                        totalRows++;
                    });
                }
                // Display message if results are empty
                if (data.length == 0) {
                    var cell = tbody.insertRow()//.insertCell();
                    cell.innerHTML = '<td colspan="2">No records.</td>';
                }

                //add overflow when over 15 records
                if (totalRows > 15) {
                    $(divOverflow).css('height', '500px');
                    $(divOverflow).css('overflow-x', 'auto');
                }

                //Init Bootstrap Tooltips
                setTooltips();

            } //end RenderTableRows()

            /*== Close Modal */
            function closeMe() {
                $('#' + settings.id).modal('hide');
                if (settings.isSubModal)
                    $('body').addClass('modal-open');
            }

            /*== Bootstrap Tooltips */
            function setTooltips() {
                $('[data-toggle="picker-tooltip"]').tooltip({
                    animation: false,
                    placement: "top"
                });
            }
        });

    };// end plugin

}(jQuery));

$(document).on('click', '.RemoveListItem', function () {
    $(this).remove();
});

//This model reflex MS SelectListItem class
var sampleData = [{
    Disabled: false,
    Group: {
        Disabled: false,
        Name: "Group-1"
    },
    Selected: false,
    Text: "Sample test 1",
    Value: "1"
}, {
    Disabled: true,
    Group: {
        Disabled: false,
        Name: "Group-1"
    },
    Selected: false,
    Text: "Sample test 2",
    Value: "2"
}, {
    Disabled: false,
    Group: {
        Disabled: false,
        Name: "Group-1"
    },
    Selected: false,
    Text: "Sample test 3",
    Value: "3"
}, {
    Disabled: false,
    Group: {
        Disabled: false,
        Name: "Group-1"
    },
    Selected: false,
    Text: "Sample test 4",
    Value: "4"
}, {
    Disabled: false,
    Group: {
        Disabled: false,
        Name: "Group-1"
    },
    Selected: false,
    Text: "Sample test 5",
    Value: "5"
}]
