// Tissue Box Holder — square Kleenex box
// Two-part design: an outer sleeve (smooth top, vertically ribbed sides,
// open bottom) and a removable base plate that snaps in/out from below to
// keep the box from falling out.
//
// HOW TO USE
//   1. Measure your box (width, depth, height) and set box_w / box_d / box_h below.
//   2. Set `part` to "sleeve", "base", or "both" to choose what to render.
//   3. Render (F6) and export STL (File > Export > Export as STL).
//   4. Print the sleeve and base separately. No supports needed.
//
// PRINT SETTINGS
//   - 0.4mm nozzle, 0.2mm layers, 3 perimeters, 15% infill (base can be higher).
//   - PLA or PETG. The snap ridge relies on slight wall flex, so avoid very
//     stiff/brittle filaments (e.g. pure PLA is fine; heavily-filled filaments are not).

/* [Rendering] */
// Which part to render: "sleeve", "base", or "both"
part = "both";

/* [Box dimensions - measure your actual box] */
box_w = 124;   // box width (mm)
box_d = 124;   // box depth (mm)
box_h = 124;   // box height (mm)

/* [Fit] */
clearance   = 1.6;  // gap between box and inner sleeve wall, per side
base_fit_gap = 0.4; // gap between base plate and inner sleeve wall, per side

/* [Sleeve] */
wall          = 2.4;  // sleeve wall thickness
top_thickness = 3.2;  // solid top thickness
outer_radius  = 6;    // rounded corner radius on the outside of the sleeve

/* [Ribs - small vertical stripes on the sides] */
rib_width  = 1.8;  // width of each stripe
rib_depth  = 0.9;  // how far each stripe protrudes
rib_gap    = 3.6;  // gap between stripes
rib_margin_top    = 10; // keep ribs clear of the smooth top
rib_margin_bottom = 6;  // keep ribs clear of the bottom edge / relief slits

/* [Top tissue slot] */
slot_length = 90;  // long axis of the oval pull slot
slot_width  = 22;  // short axis of the oval pull slot
slot_fillet_r = 3; // rounding on the slot's own edge (chamfer look)

/* [Base plate] */
plate_thickness = 3;    // base plate thickness
snap_height     = 4.5;  // height of the snap ridge above the bottom edge
ridge_protrusion = 0.75; // how far the internal snap ridge sticks inward
                          // (engagement onto the plate = ridge_protrusion - base_fit_gap;
                          //  keep this ~0.3-0.4mm for an easy hand snap in/out)
ridge_band_height = 1.6;// vertical extent of the ridge bead
corner_slit_height = 18; // vertical relief slits at corners, lets walls flex
corner_slit_width  = 1.0;
thumb_notch_r = 9;      // thumb access notch radius, front & back walls

// ---------------------------------------------------------------------
// derived dimensions
// ---------------------------------------------------------------------
inner_w = box_w + 2 * clearance;
inner_d = box_d + 2 * clearance;
outer_w = inner_w + 2 * wall;
outer_d = inner_d + 2 * wall;
inner_radius = max(outer_radius - wall, 0.5);
sleeve_wall_height = box_h; // walls run the full height of the box
$fn = 64;

module rounded_rect(w, d, r) {
    hull() {
        for (sx = [-1, 1], sy = [-1, 1])
            translate([sx * (w / 2 - r), sy * (d / 2 - r)])
                circle(r = r);
    }
}

// one vertical stripe, centered at local x=0, sitting proud of a flat wall
// face whose outward normal is +Y (rotated/translated into place by caller)
module rib_blank(height) {
    translate([-rib_width / 2, 0, rib_margin_bottom])
        cube([rib_width, rib_depth + 0.01, height - rib_margin_top - rib_margin_bottom]);
}

// place a row of ribs along a flat wall segment, then rotate/translate the
// whole row so the ribs' local +Y (outward) lines up with the true outward
// normal of the requested face: "north" +Y, "south" -Y, "east" +X, "west" -X
module rib_row(seg_length, face_offset, side) {
    pitch = rib_width + rib_gap;
    count = max(floor((seg_length - rib_gap) / pitch), 1);
    row_span = count * pitch - rib_gap;
    start = -row_span / 2 + rib_width / 2;

    face_rotation =
        side == "north" ? 0 :
        side == "south" ? 180 :
        side == "east"  ? -90 : 90;

    rotate([0, 0, face_rotation])
        translate([0, face_offset, 0])
            for (i = [0 : count - 1])
                translate([start + i * pitch, 0, 0])
                    rib_blank(sleeve_wall_height);
}

module vertical_relief_slits() {
    // thin cuts near each rounded corner so the four walls can flex
    // independently when the base plate snaps past the ridge
    offset = outer_radius * 0.7;
    for (sx = [-1, 1], sy = [-1, 1])
        translate([sx * (outer_w / 2 - offset), sy * (outer_d / 2 - offset), -0.5])
            cylinder(h = corner_slit_height + 0.5, d = corner_slit_width);
}

module thumb_notches() {
    // semi-circular access notches on front & back bottom edge so a
    // finger can push/pull the base plate during snap in/out
    for (sy = [-1, 1])
        translate([0, sy * outer_d / 2, -0.5])
            cylinder(h = snap_height + ridge_band_height + 1, r = thumb_notch_r);
}

module snap_ridge_ring() {
    // thin bead running around the inside of the sleeve near the bottom,
    // protruding inward from the cavity wall; the base plate rests on
    // top of it once pushed past
    difference() {
        translate([0, 0, snap_height])
            linear_extrude(height = ridge_band_height)
                difference() {
                    rounded_rect(inner_w, inner_d, inner_radius);
                    offset(delta = -ridge_protrusion)
                        rounded_rect(inner_w, inner_d, inner_radius);
                }
        thumb_notches();
    }
}

module sleeve() {
    front_back_span = outer_w - 2 * outer_radius;
    left_right_span  = outer_d - 2 * outer_radius;

    difference() {
        union() {
            // main wall tube
            difference() {
                linear_extrude(height = sleeve_wall_height)
                    rounded_rect(outer_w, outer_d, outer_radius);
                translate([0, 0, -0.5])
                    linear_extrude(height = sleeve_wall_height + 1)
                        rounded_rect(inner_w, inner_d, inner_radius);
            }
            // solid smooth top with tissue slot cut later
            translate([0, 0, sleeve_wall_height])
                linear_extrude(height = top_thickness)
                    rounded_rect(outer_w, outer_d, outer_radius);

            // vertical ribbed stripes, front/back (normal = Y) and
            // left/right (normal = X) flat wall segments only —
            // rounded corners stay smooth
            rib_row(front_back_span, outer_d / 2, "north");
            rib_row(front_back_span, outer_d / 2, "south");
            rib_row(left_right_span, outer_w / 2, "east");
            rib_row(left_right_span, outer_w / 2, "west");

            // internal snap ridge that the base plate clicks under
            snap_ridge_ring();
        }

        // oval tissue pull slot in the smooth top
        translate([0, 0, sleeve_wall_height - 0.5])
            linear_extrude(height = top_thickness + 1)
                offset(r = slot_fillet_r)
                    offset(delta = -slot_fillet_r)
                        hull() {
                            translate([-(slot_length - slot_width) / 2, 0])
                                circle(d = slot_width);
                            translate([(slot_length - slot_width) / 2, 0])
                                circle(d = slot_width);
                        }

        vertical_relief_slits();
        thumb_notches();
    }
}

module base_plate() {
    plate_w = inner_w - 2 * base_fit_gap;
    plate_d = inner_d - 2 * base_fit_gap;
    linear_extrude(height = plate_thickness)
        rounded_rect(plate_w, plate_d, max(inner_radius - base_fit_gap, 0.5));
}

if (part == "sleeve") {
    sleeve();
} else if (part == "base") {
    base_plate();
} else {
    sleeve();
    translate([outer_w + 20, 0, 0])
        base_plate();
}
