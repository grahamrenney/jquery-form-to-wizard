jquery-form-to-wizard
=====================

Converts a long form with fieldsets into a wizard driven form.

#Usage

```javascript
$("#someForm")formWizard({
	submitButton: "someButton" // optional : name of submit button you may want moved near to the prev/next buttons
	holderElement: "someDiv" // optional : element where the form wizard steps should be nested within
	tabIndex: 0 // optional: goes to the specifed step (0 index based)
});
```

#CSS

The css styles in formToWizard.css may be changed or overridden as per your unique requirements