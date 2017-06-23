# Modal-Picker
A JQuery plugin that creates a Bootstrap modal picker.

* Modal-Picker v1.2.6 requirements:
* -jQuery +
* -Bootstrap v3.3.7

Creates a Bootstrap modal with a list of items to select from, then copy selected value to HTML input control. Commonly use to replace drop-down options where data 
list can dynamically change. Traditionally, when values in a drop-down options are updated. When user review a record where the value no longer exist in the list, 
an error is throw because the drop-down control cannot pre-select that value. This makes drop-down values very strict. With Modal-Picker plugin, can solve this problem.

---------------
 How It Works
---------------

<pre style="margin: 0; line-height: 125%"> During the Picker plugin creation, the &lt;div&gt; wrapper is appended to <span style="color: #008000; font-weight: bold">&lt;body&gt;</span> tag at the bottom of page. This allow quick loading through-out the entire web application.
 When using ajax parameter, the ajax is only called once to create the picker modal. If user clicked again, plugin checks to see if the modal Id already exist. If TRUE, simply display the modal.
 Selected text and value are copied to the <span style="color: #008000; font-weight: bold">&lt;input&gt;</span> element. Text will display in the field while also adding the data-name=&quot;text&quot; and data-id=&quot;value&quot; to that element.
 When using a <span style="color: #008000; font-weight: bold">&lt;div&gt;</span> element, buttons are created to allow user to select more than one item from the list.
</pre>

----------------
 General Setup
----------------

Add a script link to the plugin.
<pre>
<script src="~/Scripts/mi-picker.js"></script>
</pre>

Add a text box and a button.
Button will trigger the modal picker.
Text box is used to copy the selected value/text from the picker.

<pre style="margin: 0; line-height: 125%">
<span style="color: #008000; font-weight: bold">&lt;div</span> <span style="color: #7D9029">class=</span><span style="color: #BA2121">&quot;form-group-sm form-inline&quot;</span><span style="color: #008000; font-weight: bold">&gt;</span>
    <span style="color: #008000; font-weight: bold">&lt;input</span> <span style="color: #7D9029">type=</span><span style="color: #BA2121">&quot;text&quot;</span> <span style="color: #7D9029">id=</span><span style="color: #BA2121">&quot;textbox1&quot;</span> <span style="color: #7D9029">class=</span><span style="color: #BA2121">&quot;form-control&quot;</span> <span style="color: #7D9029">disabled=</span><span style="color: #BA2121">&quot;disabled&quot;</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
    <span style="color: #008000; font-weight: bold">&lt;button</span> <span style="color: #7D9029">type=</span><span style="color: #BA2121">&quot;button&quot;</span> <span style="color: #7D9029">id=</span><span style="color: #BA2121">&quot;button1&quot;</span> <span style="color: #7D9029">class=</span><span style="color: #BA2121">&quot;btn btn-xs btn-primary&quot;</span><span style="color: #008000; font-weight: bold">&gt;</span>...<span style="color: #008000; font-weight: bold">&lt;/button&gt;</span>
<span style="color: #008000; font-weight: bold">&lt;/div&gt;</span>
</pre>


Add the <script> tag.
<pre>
<script>
    $(document).ready(function () {

		  $('#button1').click(function () {
			  $('#textbox1').Picker();
		  });

	});
</script>
</pre>

----------------
Plugin Options
----------------
Modal-Picker accepts a few options to better customize the picker modal.

<table class="table table-condensed table-striped">
	<tbody>
		<tr>
			<td>id</td>
			<td>(optional)	MyModal	</td>
			<td>overrides the default parent Id of the modal div.</td>
		</tr>
		<tr>
			<td>title</td>
			<td style="nowrap">(optional)	Title Goes Here</td>
			<td>overrides the default modal title.</td>
		</tr>
		<tr>
			<td>group</td>
			<td>(optional)	NULL</td>
			<td>returns specific group when using server calls, see ajax. Also, append group name to css class for additional jquery functionally.</td>
		</tr>
		<tr>
			<td>buttonTemplate</td>
			<td>(optional)	NULL</td>
			<td>If not set, will use Bootstrap 'gyphicon-unchecked' for the button image.
				   <span class="text-info"> NOTE: text is place inside of a button tag. </span>
<pre style="margin: 0; line-height: 125%">
buttonTemplate: &#39;pickMe&#39; 
Or do a FontAwesome icon like this: 
buttonTemplate:&#39;<span style="color: #007700">&lt;i</span> <span style="color: #0000CC">class=</span><span style="background-color: #fff0f0">&quot;fa fa-circle&quot;</span><span style="color: #007700">&gt;&lt;/i&gt;</span>&#39;
</pre>
			</td>
		</tr>					
		<tr>
			<td>data</td>
			<td>(optional)	NULL</td>
			<td>provide a custom set of data to fill the picker values. This data model is
		based from Microsoft MVC SelectListItem class.
		<span class="text-info">Javascript Object = [{Text: "Sample test 1", Value: "1", Group: {Name: "Group-1"} }]</span></td>
		</tr>
		<tr>
			<td>ajax</td>
			<td>(optional)	false</td>
			<td>when true, will make a ajax call to server with return Json result to fill the picker values.</td>
		</tr>
		<tr>
			<td>url</td>
			<td>(optional)	NULL</td>
			<td>required when ajax set to true. URL of server controller to fetch Json data model.
		</tr>							
		<tr>
			<td>multiSelect</td>
			<td>(optional)	false</td>
			<td>Turns picker into a multi-select mode to prevent opening and closing a modal window. Great when using DIV elements!</td>
		</tr>
		<tr>
			<td>isSubModal</td>
			<td>(optional)	false</td>
			<td>When using the picker from another modal window, set this to true to allow parent modal to scroll (when needed).</td>
		</tr>
		<tr>
			<td>callback</td>
			<td>(optional)	function()</td>
			<td>provide additional jquery functionally once the selection has been made.</td>
		</tr>
		<tr>
			<td>showBlank</td>
			<td>(optional)	false</td>
			<td>place a blank item at top of list to allow uses to clear a selected item.</td>
		</tr>
	</tbody>
</table>



----------------
Change History
----------------
* v1.1.0 - 2/23/2017: added feature to search list 
* v1.2.0 - 3/02/2017: ability to add a list of buttons to a DIV tag
* v1.2.1 - 3/07/2017: add multiSelect option. When using DIVs, you can build a list of buttons and pre-select the item without opening and closing the model.
* v1.2.2 - 3/21/2017: Add isSubModal option. When using picker as a parent modal, upon close removes the class="modal-open" from the <body> tag to allow scrolling on the main page.
* v1.2.3 - 3/22/2017: Truncate text longer than 30 characters
* v1.2.4 - 4/11/2017: BUG FIXES, 
                        - Relocate AJAX after the intital check for existing modal picker. AJAX calls were made on every call instead of the 1st call only. 
                        - Relocate the callback function within the button click event to fired once a selection was made.
                        - When Searching, not able to merge simple ({Value: '', Text: ''}) model to filtered array.			
* v1.2.5 - 5/15/2017: Added feature, Bootstrap's tooltip to display additional information for each item.
                        - NOTE: Since MS SelectListItem class doesn't inculde the "Title" property, must use a anyomus type class object ({Value: '', Text: '', Title: ''}) to build model.
                        Renamed the 'callback' option to 'onSelected' to provide better understanding and usability.
* v1.2.6 - 6/12/2017: Added feature to include a blank option at the top of the list. Useful for allowing users to blank/clear the selected picked item.
