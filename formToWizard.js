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
        var submmitButton = config.submitButton ? $("#" + config.submitButton) : null;
        // optional element which will hold the step links
        var holderElement = config.holderElement;
        // if specified this refers to the tab that should be selected - e.g. if you resume form capture you can specify the tab to resume on
        var startIndex = config.startIndex;

        // place the wizard steps either in the specified holder or place before this element
        if (holderElement) {
            $("#" + holderElement).append("<ul id='wizard'></ul>");
        } else {
            $(elem).before("<ul id='wizard'></ul>");
        }

        // create wizard steps and add click behaviour
        fieldsets.each(function(i) {
            // wrap this fieldset with a step content di
            $(this).wrap("<div id='stepContent" + i + "'></div>");

            // add the prev/next controls div at the end of this fieldset's content
            $(this).append("<div id='step" + i + "controls'></div>");

            // add step links to wizard step div
            $("#wizard").append("<li id='stepLink" + i + "'>Step " + (i + 1) + "<span>" + $(this).find("legend").html() + "</span></li>");

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
            $("#step" + i + "controls").append("<input type='button' name='next' value='" + type + "' class='btn btn-default' id='" + stepName + type + "'></input>&nbsp;&nbsp;");
            $("#stepContent" + i + type).bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i + offset)).show();
                activate((i + offset));
            });
        }

        function activate(i) {
            $("#wizard li").removeClass("current");
            $("#stepLink" + i).addClass("current");
            $("#step" + i + "controls").show();
            $("#stepContent" + i).show();
            /// move submit button into the next/prev controls div
            submmitButton.appendTo('#step' + i + 'controls');
        }
    }
})(jQuery);