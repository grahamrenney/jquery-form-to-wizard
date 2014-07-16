/* Created by graham renney - https://github.com/grahamrenney/jquery-form-to-wizard */

(function($) {
	$.fn.formWizard = function(config) {
		// 
		var elem = this;

		// the fieldsets are used to split the form
		var fieldsets = $(elem).find("fieldset");
		// number of steps for the wizard
		var stepCount = fieldsets.size();
		// the submit button, if specified will be moved to the controls div which contains prev and next buttons
		var submitButton = config.submitButton ? $("#" + config.submitButton) : null;
		// optional element which will hold the step links
		var holderElement = config.holderElement;
		// if specified this refers to the tab that should be selected - e.g. if you resume form capture you can specify the tab to resume on
		var startIndex = config.startIndex;
		// if specified, will hide the submit button on 'add' mode until last tab reached and will show submit on all tabs for edit mode 
		var editMode = config.editMode || false;

		console.log('formWizard init() : steps: ' + stepCount + ', submitButton: ' + submitButton + ', holderElement: ' + holderElement + ', startIndex: ' + startIndex + ', editMode: ' + editMode);

		// place the wizard steps either in the specified holder or place before this element
		if (holderElement) {
			$("#" + holderElement).append("<ul id='wizard' class='nav nav-pills'></ul>");
		} else {
			$(elem).before("<ul id='wizard' class='nav nav-pills'></ul>");
		}

		// create wizard steps and add click behaviour
		fieldsets.each(function(i) {
			// wrap this fieldset with a step content di
			$(this).wrap("<div id='stepContent" + i + "'></div>");

			// add the prev/next controls div at the end of this fieldset's content
			$(this).append("<div id='step" + i + "controls' class='wizard-controls'></div>");

			// add step links to wizard step div
			//$("#wizard").append("<li id='stepLink" + i + "'>Step " + (i + 1) + "<span>" + $(this).find("legend").html() + "</span></li>");
			$("#wizard").append("<li id='stepLink" + i + "'><a>" + $(this).find("legend").html() + "</a></li>");

			// $(elem).find("#step" + i).find("fieldset").find("legend").append("<div class='right' id='step" + i + "controls' class='stepcontrols'></div>")

			$("#stepLink" + i).bind("click", function(e) {
				// hide all steps that have id that starts with 'stepContent'
				$('div[id^="stepContent"]').hide();
				// show current step
				$("#stepContent" + i).show();
				activate(i);
			});

			// hide content of this fieldset - activate(i) will show only that step's content when called
			$("#stepContent" + i).hide();

			if (i == 0) {
				// if first step only show next button
				createNext(i);
			} else if (i == stepCount - 1) {
				// if last step - only show prev button
				createPrev(i);
			} else {
				// if middle steps show both next and prev button
				createPrev(i);
				createNext(i);
			}
		});

		// goto the specified step index if provided, else select first step
		if (startIndex) {
			$('div[id^="stepContent"]').hide();
			$("#stepContent" + startIndex).show();
			activate(startIndex);
		} else {
			activate(0);
		}

		function createNext(i) {
			createButton(i, 'Next', 1);
		}

		function createPrev(i) {
			createButton(i, 'Previous', -1);
		}

		function createButton(i, type, offset) {
			var stepName = "stepContent" + i;
			var content = "<i class='glyphicon glyphicon-chevron-left'></i>" + type;
			if (type === 'Next') {
				content = type + "<i class='glyphicon glyphicon-chevron-right' style='margin-right: 0px; margin-left: 10px;'></i>";
			}
			$("#step" + i + "controls").append("<button type='button' name='next' class='btn btn-default' id='" + stepName + type + "'>" + content + "</button>&nbsp;&nbsp;");
			$("#stepContent" + i + type).bind("click", function(e) {
				$("#" + stepName).hide();
				$("#step" + (i + offset)).show();
				activate((i + offset));
			});
		}

		function activate(i) {
			submitButton.hide();
			$("#wizard li").removeClass("active");
			$("#stepLink" + i).addClass("active");
			$("#step" + i + "controls").show();
			$("#stepContent" + i).show();
			/// move submit button into the next/prev controls div
			submitButton.appendTo('#step' + i + 'controls');
			// only show submit button on last step
			if (editMode && submitButton) {
				submitButton.show();
			}
			else if (!editMode && submitButton && stepCount == (i + 1)) {
				submitButton.show();
			}
		}
	}
})(jQuery);