"use strict";

class CenterElements {
    constructor(element, options = null) {
        ////////////////////////////////////
        // Check jQuery
        if (typeof $ !== "function") {
            console.error("[Center] Error: jQuery is required.");
            return;
        }

        ////////////////////////////////////
        // Identyficate and check element 
        this.elements = $(element);
        if (this.elements.length < 1) {
            console.error("[Center] Error: No elements to center.");
            return;
        }

        ////////////////////////////////////
        // Default values of CenterElements
        this.mode = "padding";
        this.reference = "relative";
        this.ignore_parent_padding = true;
        this.allow_negative_margin = false;
        this.from_top = 0;
        this.from_bottom = 0;


        ////////////////////////////////////
        // Validate options
        if (options !== null) {
            // Check mode
            if (options.mode !== undefined) {
                if (options.mode === "padding") {
                    this.mode = "padding";
                } else if (options.mode === "margin") {
                    this.mode = "margin";
                } else {
                    console.error("[Center] Error: Option mode has inapropriate value. Use 'padding' | 'margin' instead.");
                }
            }

            // Check reference
            if (options.reference !== undefined) {
                if (options.reference === "relative") {
                    this.reference = "relative";
                } else if (options.reference === "parent") {
                    this.reference = "parent";
                } else {
                    console.error("[Center] Error: Option reference has inapropriate value. Use 'relative' | 'parent' instead.");
                }
            }

            // Check ignore_parent_padding
            if (options.ignore_parent_padding !== undefined) {
                if (options.ignore_parent_padding == true) {
                    this.ignore_parent_padding = true;
                } else if (options.ignore_parent_padding == false) {
                    this.ignore_parent_padding = false;
                } else {
                    console.error("[Center] Error: Option ignore_parent_padding has inapropriate value. Use true | false instead.");
                }
            }

            // Check allow_negative_margin
            if (options.allow_negative_margin !== undefined) {
                if (options.allow_negative_margin == true) {
                    this.allow_negative_margin = true;
                } else if (options.allow_negative_margin == false) {
                    this.allow_negative_margin = false;
                } else {
                    console.error("[Center] Error: Option allow_negative_margin has inapropriate value. Use true | false instead.");
                }
            }


            // Check from_top
            if (options.from_top !== undefined) {
                var val = Number(options.from_top);
                if (options.mode === "padding") {
                    if (val < 0) {
                        console.error("[Center] Error: Option from_top has inapropriate value. Value has to be greater or equal 0.");
                    } else {
                        this.from_top = val;
                    }
                } else {
                    this.from_top = val;
                }
            }

            // Check from_bottom
            if (options.from_bottom !== undefined) {
                var val = Number(options.from_bottom);
                if (options.mode === "padding") {
                    if (val < 0) {
                        console.error("[Center] Error: Option from_bottom has inapropriate value. Value has to be greater or equal 0.");
                    } else {
                        this.from_bottom = val;
                    }
                } else {
                    this.from_bottom = val;
                }
            }
        }

        ////////////////////////////////////
        // Variables, do not change this by hand
        this.greatest_height = -1;

        // Set size - reload
        this.reload();
    }

    reload() {
        // Choose the reference
        if (this.reference === "relative") {
            // Reset values
            this.greatest_height = -1;

            // Find greatest element
            var self = this;
            this.elements.each(function() {
                var h;
                if (self.mode === "padding") {
                    h = $(this).height();
                } else {
                    h = $(this).outerHeight();
                }

                if (h > self.greatest_height) self.greatest_height = h;
            });

            // Set margin or padding
            this.elements.each(function() {
                var h;
                if (self.mode === "padding") {
                    h = $(this).height();
                } else {
                    h = $(this).outerHeight();
                }
                var to_add = (self.greatest_height - h) / 2;

                $(this).css(self.mode + "-top", (to_add + self.from_top) + "px");
                $(this).css(self.mode + "-bottom", (to_add + self.from_bottom) + "px");
            });
        } else {
            // Set margin or padding
            var self = this;
            this.elements.each(function() {
                var parent_height;

                var parent_padding_top = (self.ignore_parent_padding) ? 0 : $(this).parent().css("padding-top").replace("px", "");
                var parent_padding_bottom = (self.ignore_parent_padding) ? 0 : $(this).parent().css("padding-bottom").replace("px", "");

                var to_add_from_top;
                var to_add_from_bottom;

                if (self.mode === "padding") {
                    var h = $(this).height();
                    parent_height = (self.ignore_parent_padding) ? $(this).parent().height() : $(this).parent().innerHeight();

                    var element_marging_top = $(this).css("margin-top").replace("px", "");
                    var element_marging_bottom = $(this).css("margin-bottom").replace("px", "");

                    var to_add_temp = ((parent_height - h) / 2);
                    to_add_from_top = to_add_temp - parent_padding_top - element_marging_top;
                    to_add_from_bottom = to_add_temp - parent_padding_bottom - element_marging_bottom;
                    if (to_add_from_top < 0) to_add_from_top = 0;
                    if (to_add_from_bottom < 0) to_add_from_bottom = 0;
                } else {
                    var h = $(this).outerHeight();
                    parent_height = $(this).parent().innerHeight();

                    var to_add_temp = ((parent_height - h) / 2);
                    to_add_from_top = to_add_temp - parent_padding_top;
                    to_add_from_bottom = to_add_temp - parent_padding_bottom;
                    if (self.allow_negative_margin === false && to_add_from_top < 0) to_add_from_top = 0;
                    if (to_add_from_bottom < 0) to_add_from_bottom = 0;
                }

                $(this).css(self.mode + "-top", (to_add_from_top + self.from_top) + "px");
                $(this).css(self.mode + "-bottom", (to_add_from_bottom + self.from_bottom) + "px");
            });
        }
    }
}