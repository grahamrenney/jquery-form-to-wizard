/* Created by jankoatwarpspeed.com */

(function($) {
    $.fn.formToWizard = function(options) {
        options = $.extend({  
            submitButton: "" 
        }, options); 
        
        var element = this;

        var steps = $(element).find("fieldset");
        var count = steps.size();
        var submmitButtonName = "#" + options.submitButton;
        var placementElement = options.placementElement;
        var tabIndex = options.tabIndex;  

        if (placementElement) {
        	$("#" + placementElement).append("<ul id='steps'></ul>");
        } else {
        	$(element).before("<div class='grey_row'><ul id='steps'></ul></div>");
        }

        steps.each(function(i) {
            $(this).wrap("<div id='step" + i + "'></div>");
            $(this).append("<p id='step" + i + "commands' class='pull-right'></p>");

            // 2
            var name = $(this).find("legend").html();
            $("#steps").append("<li id='stepDesc" + i + "'>Step " + (i + 1) + "<span>" + name + "</span></li>");

            // $(element).find("#step" + i).find("fieldset").find("legend").append("<div class='right' id='step" + i + "commands' class='stepCommands'></div>")

            $("#stepDesc" + i).bind("click", function (e) {
                var stepName = "step" + i;
                $('div[id^="step"]').hide();
                $("#" + stepName).show();
                selectStep("" + i);
            });

            if (i == 0) {
                createNextButton(i);
                selectStep(i);
                $("#stepDesc" + i).addClass("current");
            }
            else if (i == count - 1) {
                $("#step" + i).hide();
                createPrevButton(i);
            }
            else {
                $("#step" + i).hide();
                createPrevButton(i);
                createNextButton(i);
            }
        });
        $(submmitButtonName).appendTo('#step' + 0 + 'commands');

        if (tabIndex) {
            var stepName = "step" + tabIndex;
            $('div[id^="step"]').hide();
            $("#" + stepName).show();
            selectStep(tabIndex);
        }

        function createPrevButton(i) {
            var stepName = "step" + i;
            // <input type="button" name="next" value="Next" class="btn btn-primary ng-binding" ng-click="tab.index = 1" />
            $("#" + stepName + "commands").append("<input type='button' name='prev' value='Previous' class='btn btn-default' id='" + stepName + "Prev'></input>&nbsp;&nbsp;");
            $("#" + stepName + "Prev").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i - 1)).show();
                selectStep(i - 1);
            });
        }

        function createNextButton(i) {
            var stepName = "step" + i;
            $("#" + stepName + "commands").append("<input type='button' name='next' value='Next' class='btn btn-default' id='" + stepName + "Next'></input>&nbsp;&nbsp;");
            $("#" + stepName + "Next").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i + 1)).show();
                selectStep(i + 1);
            });
        }

        function selectStep(i) {
            $("#steps li").removeClass("current");
            $("#stepDesc" + i).addClass("current");
            $("#step" + i + "commands").show();
            $(submmitButtonName).appendTo('#step' + i + 'commands');
        }

    }
})(jQuery); 