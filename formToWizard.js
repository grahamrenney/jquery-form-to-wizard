(function($) {
    $.fn.formToWizard = function(options) {
        options = $.extend({  
            submitButton: "" ,
            nextButtonName: "" ,
            previousButtonName: "" ,
            buttonDiv: "" 
        }, options); 
        
        var element = this;

        var steps = $(element).find("fieldset");
        var count = steps.size();
        var submmitButtonName = "#" + options.submitButton;
        var buttonDiv = "#" + options.buttonDiv;
        $(element).before("<ul id='steps' class='nav nav-tabs nav-justified'></ul>");

        steps.each(function(i) {
            $(this).wrap("<div id='step" + i + "'></div>");
            $(this).append("<div id='step" + i + "commands' class='right'></div>");

            var name = $(this).find("legend").html();
            $("#steps").append("<li id='stepDesc" + i + "'><a id='stepTab" + i + "'>" + name + "</a></li>");

            // $(element).find("#step" + i).find("fieldset").find("legend").append("<div class='right' id='step" + i + "commands' class='stepCommands'></div>")

            $("#stepTab" + i).bind("click", function (e) {
                var stepName = "step" + i;
                $('div[id^="step"]').hide();
                $("#" + stepName).show();
                selectStep("" + i);
            });

            if (i == 0) {
                createNextButton(i);
                selectStep(i);
                $("#stepDesc" + i).addClass("active");
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
        $(buttonDiv).appendTo('#step' + 0 + 'commands');

        function createPrevButton(i) {
            var stepName = "step" + i;
            // <input type="button" name="next" value="Next" class="btn btn-primary ng-binding" ng-click="tab.index = 1" />
            $("#" + stepName + "commands").append("<input type='button' name='prev' value='"+ options.previousButtonName +"' class='btn btn-secondary' id='" + stepName + "Prev'></input>&nbsp;&nbsp;");
            $("#" + stepName + "Prev").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i - 1)).show();
                selectStep(i - 1);
            });
        }

        function createNextButton(i) {
            var stepName = "step" + i;
            $("#" + stepName + "commands").append("<input type='button' name='next' value='"+ options.nextButtonName +"' class='btn btn-secondary' id='" + stepName + "Next'></input>&nbsp;&nbsp;");
            $("#" + stepName + "Next").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i + 1)).show();
                selectStep(i + 1);
            });
        }

        function selectStep(i) {
            $("#steps li").removeClass("active");
            $("#stepDesc" + i).addClass("active");
            $("#step" + i + "commands").show();
            $(submmitButtonName).appendTo('#step' + i + 'commands');
            $(buttonDiv).appendTo('#step' + i + 'commands');
        }

    }
})(jQuery); 