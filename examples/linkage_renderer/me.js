// set up scenes
var scene = new THREE.Scene()
scene.background = new THREE.Color( 0xffffff );

var camera = new THREE.OrthographicCamera( window.innerWidth / - 400, window.innerWidth / 400, (0.8*window.innerHeight) / 400, (0.8*window.innerHeight) / - 400, 0.0, 1000 );
// var camera = new THREE.PerspectiveCamera( 130, window.innerWidth / (0.8*window.innerHeight), 0.1, 1000 )

camera.position.z = 5

// build renderers
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, (0.8*window.innerHeight) );
document.body.appendChild( renderer.domElement );

// orbit controls
var controls = new THREE.OrbitControls (camera, renderer.domElement);

var active_point_geometry = new THREE.SphereGeometry( 0.05, 16 )
var active_point_material = new THREE.MeshBasicMaterial( { color: 0xff77777 } )

// manifold
class Manifold {
    constructor() {        
    }
    add_to_scene() {
        scene.add(this.grouped_meshes)
    }
    animate() {
    }
}

class GenericManifold extends Manifold {
    constructor() {
        this.grouped_meshes = new THREE.Group()

        // do stuff here

        super()
    }
    animate() {

        // do more stuff here

    }
}

class CirclesTwoIntersections extends Manifold {
    constructor() {
        super()
        this.grouped_meshes = new THREE.Group()

        // attributes
        this.active_point = [1, Math.PI/3]
        this.circle_radius = 1
        this.color1 = 0x77ffff // circle 1
        this.color2 = 0xffff77 // circle 2
        this.color3 = 0xff77ff // fixed points
        this.color4 = 0x777777 // angle helpers

        // twin circles
        var circle_geometry = new THREE.EdgesGeometry( new THREE.CircleGeometry( 1, 1028 ) )
        var material_1 = new THREE.MeshBasicMaterial( { color: this.color1, wireframe: true } )
        var material_2 = new THREE.MeshBasicMaterial( { color: this.color2, wireframe: true } )
        var circle_1 = new THREE.Mesh( circle_geometry, material_1 )
        var circle_2 = new THREE.Mesh( circle_geometry, material_2 )
        this.grouped_meshes.add( circle_1 ) 
        this.grouped_meshes.add( circle_2 ) 
        circle_2.rotation.y = Math.PI/2

        // fixed points
        var fixed_point_geometry = new THREE.SphereGeometry( 0.05, 16 )
        var fixed_point_material = new THREE.MeshBasicMaterial( { color: this.color3 } )
        var fixed_point_1 = new THREE.Mesh( fixed_point_geometry, fixed_point_material )
        var fixed_point_2 = new THREE.Mesh( fixed_point_geometry, fixed_point_material )
        this.grouped_meshes.add( fixed_point_1 )
        this.grouped_meshes.add( fixed_point_2 )
        fixed_point_1.position.y += this.circle_radius
        fixed_point_2.position.y -= this.circle_radius

        // coordinate
        var active_point = new THREE.Mesh( active_point_geometry, active_point_material )
        active_point.position.y += this.circle_radius
        var active_point_pivot = new THREE.Object3D()
        active_point_pivot.add( active_point )
        active_point_pivot.rotation.x = this.active_point[1]
        active_point_pivot.rotation.y = this.active_point[0] * Math.PI/2
        this.grouped_meshes.add( active_point_pivot )
        
        // angle helpers
        // lines
        var line_1_points = [ 
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 0, this.circle_radius, 0 )
        ]
        var line_2_points = [ 
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 
                ( 1 - this.active_point[0] ) * this.circle_radius * Math.sin( this.active_point[1] ),
                this.circle_radius * Math.cos( this.active_point[1] ),
                this.active_point[0] * this.circle_radius * Math.sin( this.active_point[1] )
            )
        ]
        var line_1_geometry = new THREE.BufferGeometry().setFromPoints( line_1_points )
        var line_2_geometry = new THREE.BufferGeometry().setFromPoints( line_2_points )
        var line_material = new THREE.LineBasicMaterial( { color: this.color4 } )
        var line_1 = new THREE.Line( line_1_geometry, line_material )
        var line_2 = new THREE.Line( line_2_geometry, line_material )
        this.grouped_meshes.add( line_1, line_2 )

        // arc
        var arc_geometry = new THREE.CircleGeometry( this.circle_radius/2, 10, Math.PI/2, this.active_point[1] )
        var arc_material = new THREE.MeshBasicMaterial( { color: this.color4, side: 2} )
        var arc = new THREE.Mesh( arc_geometry, arc_material )
        this.grouped_meshes.add( arc )
        arc.rotation.y = this.active_point[0] * Math.PI/2

        this.add_to_scene()
    }
    animate() {
    }
}

class CirclesTwoIntersectionsSpecialCase extends Manifold { // what is this class name! :/
    constructor() {
        super()
        this.grouped_meshes = new THREE.Group()

        // attributes
        this.active_point = [1, Math.PI/3]
        this.circle_radius = 1
        this.color1 = 0x77ffff // circle 1
        this.color2 = 0xffff77 // circle 2
        this.color3 = 0xff77ff // fixed points
        this.color4 = 0x777777 // angle helpers

        // twin circles
        var circle_geometry = new THREE.EdgesGeometry( new THREE.CircleGeometry( 1, 1028 ) )
        var material_1 = new THREE.MeshBasicMaterial( { color: this.color1, wireframe: true } )
        var material_2 = new THREE.MeshBasicMaterial( { color: this.color2, wireframe: true } )
        var circle_1 = new THREE.Mesh( circle_geometry, material_1 )
        var circle_2 = new THREE.Mesh( circle_geometry, material_2 )
        var circle_3 = new THREE.Mesh( circle_geometry, material_2 )
        var circle_4 = new THREE.Mesh( circle_geometry, material_2 )
        this.grouped_meshes.add( circle_1 ) 
        this.grouped_meshes.add( circle_2 ) 
        this.grouped_meshes.add( circle_3 ) 
        this.grouped_meshes.add( circle_4 ) 
        circle_2.rotation.y = Math.PI/2
        circle_3.rotation.y = Math.PI/2
        circle_4.rotation.y = Math.PI/2
        circle_3.position.y += 2*this.circle_radius
        circle_4.position.y -= 2*this.circle_radius

        // fixed points
        var fixed_point_geometry = new THREE.SphereGeometry( 0.05, 16 )
        var fixed_point_material = new THREE.MeshBasicMaterial( { color: this.color3 } )
        var fixed_point_1 = new THREE.Mesh( fixed_point_geometry, fixed_point_material )
        var fixed_point_2 = new THREE.Mesh( fixed_point_geometry, fixed_point_material )
        this.grouped_meshes.add( fixed_point_1 )
        this.grouped_meshes.add( fixed_point_2 )
        fixed_point_1.position.y += this.circle_radius
        fixed_point_2.position.y -= this.circle_radius

        // coordinate
        var active_point = new THREE.Mesh( active_point_geometry, active_point_material )
        active_point.position.y += this.circle_radius
        var active_point_pivot = new THREE.Object3D()
        active_point_pivot.add( active_point )
        active_point_pivot.rotation.x = this.active_point[1]
        active_point_pivot.rotation.y = this.active_point[0] * Math.PI/2
        this.grouped_meshes.add( active_point_pivot )
        
        // angle helpers
        // lines
        var line_1_points = [ 
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 0, this.circle_radius, 0 )
        ]
        var line_2_points = [ 
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 
                ( 1 - this.active_point[0] ) * this.circle_radius * Math.sin( this.active_point[1] ),
                this.circle_radius * Math.cos( this.active_point[1] ),
                this.active_point[0] * this.circle_radius * Math.sin( this.active_point[1] )
            )
        ]
        var line_1_geometry = new THREE.BufferGeometry().setFromPoints( line_1_points )
        var line_2_geometry = new THREE.BufferGeometry().setFromPoints( line_2_points )
        var line_material = new THREE.LineBasicMaterial( { color: this.color4 } )
        var line_1 = new THREE.Line( line_1_geometry, line_material )
        var line_2 = new THREE.Line( line_2_geometry, line_material )
        this.grouped_meshes.add( line_1, line_2 )

        // arc
        var arc_geometry = new THREE.CircleGeometry( this.circle_radius/2, 10, Math.PI/2, this.active_point[1] )
        var arc_material = new THREE.MeshBasicMaterial( { color: this.color4, side: 2} )
        var arc = new THREE.Mesh( arc_geometry, arc_material )
        this.grouped_meshes.add( arc )
        arc.rotation.y = this.active_point[0] * Math.PI/2

        this.add_to_scene()
    }
    animate() {
    }
}

class Linkage {
    constructor() {
        this.mesh = new THREE.Group()
        scene.add( this.mesh )
    }

    draw_lines(show_alt_switch) {
        
        var line_material = new THREE.LineBasicMaterial( { color: 0x000000 } )
        var point_geometry = new THREE.SphereGeometry( 0.02, 16 )
        var point_material = new THREE.MeshBasicMaterial( { color: 0x000000 } )
        
        // draw lines and points
        this.lines.forEach(line => {

            // add line
            let line_geometry = new THREE.BufferGeometry().setFromPoints( line )
            let line_mesh = new THREE.Line( line_geometry, line_material )
            this.mesh.add( line_mesh )

            // add points
            var point_mesh = new THREE.Mesh( point_geometry, point_material )
            this.mesh.add( point_mesh )
            point_mesh.position.set( line[0].x, line[0].y, line[0].z )
        
        })

        // add last point
        var point_mesh = new THREE.Mesh( point_geometry, point_material )
        this.mesh.add( point_mesh )
        point_mesh.position.set( 
            this.lines[this.lines.length - 1][1].x,
            this.lines[this.lines.length - 1][1].y,
            this.lines[this.lines.length - 1][1].z
        )

        // if neccessary, show alternate switch position
        if (show_alt_switch) {

            // dashed lines
            var alt_line_material = new THREE.LineDashedMaterial( { color: 0x000000, dashSize: 0.01 , gapSize: 0.04 } )

            // draw lines
            this.alt_switch.forEach(line => {
                var line_geometry = new THREE.BufferGeometry().setFromPoints( line )
                var line_mesh = new THREE.Line( line_geometry, alt_line_material )
                line_mesh.computeLineDistances()
                this.mesh.add( line_mesh )
            })

            // draw point
            var point_mesh = new THREE.Mesh( point_geometry, point_material )
            this.mesh.add( point_mesh )
            point_mesh.position.set( this.alt_switch[1][0].x, this.alt_switch[1][0].y, this.alt_switch[1][0].z )
            
        }
    }
}

class Polygon extends Linkage {
    constructor( size, lengths, coords, angle_helpers=[], show_alt_switch ) {
        super()

        this.angle_helpers = angle_helpers
        
        // base
        this.lines = [[
            new THREE.Vector3( lengths[0]/2, 0, 0 ),
            new THREE.Vector3( -lengths[0]/2, 0, 0 )
        ]]
        
        // all the neccessary angles
        for ( var i = 1; i < (size-2); i++ ) {
            this.lines.push(
                [
                    this.lines[i-1][1],
                    this.lines[i-1][1].clone().add( new THREE.Vector3(
                        lengths[i] * Math.sin( coords[i-1] ),
                        lengths[i] * Math.cos( coords[i-1] ),
                        0
                    ) )
                ]
            )
        }

        // switch at the end
        var a = lengths[ lengths.length - 2 ]
        var b = lengths[ lengths.length - 1 ]
        var d = this.lines[0][0].clone().sub( this.lines[this.lines.length - 1][1] ) 
        var e = new THREE.Vector3(0, 1 ,0)
        var theta = Math.acos( d.dot(e) / d.length() )
        var alpha = (2 * coords[size - 3] - 1) * Math.acos( ( Math.pow(a,2) + Math.pow(d.length(),2) - Math.pow(b,2) ) / (2*a*d.length()) )
        var angle = theta - alpha
        
        if (show_alt_switch) {
            var alt_angle = theta + alpha
            this.alt_switch = [
                [
                    this.lines[ this.lines.length - 1 ][1],
                    this.lines[ this.lines.length - 1 ][1].clone().add( new THREE.Vector3(a*Math.sin(alt_angle),a*Math.cos(alt_angle),0) )            
                ]
            ]
            this.alt_switch.push(
                [
                    this.alt_switch[0][1],
                    this.lines[0][0]
                ]
            )
        }

        this.lines.push([
            this.lines[ this.lines.length - 1 ][1],
            this.lines[ this.lines.length - 1 ][1].clone().add( new THREE.Vector3(a*Math.sin(angle),a*Math.cos(angle),0) )            
        ])

        this.lines.push([
            this.lines[ this.lines.length - 1 ][1],
            this.lines[0][0]
        ])

        this.draw_lines(show_alt_switch)

    }
}

var light = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add(light)
var torus1 = new THREE.Mesh( 
    new THREE.TorusGeometry(3,1,16,100),
    new THREE.MeshStandardMaterial( { color: 0xeeeeee, opacity: 0.5, transparent: true } )
)
var torus2 = new THREE.Mesh( 
    new THREE.TorusGeometry(3,1,16,100),
    new THREE.MeshStandardMaterial( { color: 0xeeeeee, opacity: 0.5, transparent: true } )
)

var point = new THREE.Mesh( 
    new THREE.SphereGeometry( 0.1, 16 ),
    new THREE.MeshBasicMaterial( { color: 0xff00ff } )
)

torus1.rotation.x = Math.PI/2
torus2.rotation.x = Math.PI/2 
torus1.position.x += 4
torus2.position.x -= 4

scene.add( torus1, torus2, point )

// var ngon = new Polygon(5, [2,0.7,0.7,1.7,1.7], [-Math.PI/4,Math.PI/4,1], [true, false, true, false], false)
// var link = new Polygon(1, [1], [])
// var two_arm = new Linkage()
// two_arm.lines = [
//     // base
//     [
//         new THREE.Vector3( 0, 0, 0 ),
//         new THREE.Vector3( -1, 0, 0 )
//     ],
//     // arm one
//     [
//         new THREE.Vector3( -1, 0, 0 ),
//         new THREE.Vector3( -1.5, 0.5, 0 )
//     ],
//     // arm two
//     [
//         new THREE.Vector3( -1.5, 0.5, 0 ),
//         new THREE.Vector3( -1, 1, 0 )
//     ]
// ]
// two_arm.draw_lines(false)
// var loopthing = new CirclesTwoIntersections()
// var loopthing2 = new CirclesTwoIntersectionsSpecialCase()

function get_polygon_ranges(lengths, coords) {

    // keeping track of the origin of the arm we are working with
    var base = new THREE.Vector3( lengths[0]/2, 0, 0 )

    // base
    var current_origin = base.clone()

    // coords plus the position of the first value
    var all_coords = coords.slice(0)
    all_coords.unshift((3/2)*Math.PI)

    // the output
    var ranges = []

    for (let x = 1; x < lengths.length - 1; x++) {
        
        // add last arm to our current origin
        // current_origin.add( new THREE.Vector3( lengths[x-1] * Math.sin(all_coords[x-1]), lengths[x-1] * Math.cos(all_coords[x-1]), 0) )
        current_origin.x += lengths[x-1] * Math.round(Math.sin(all_coords[x-1]) * 1000) / 1000 
        current_origin.y += lengths[x-1] * Math.round(Math.cos(all_coords[x-1]) * 1000) / 1000 
        
        // sum of 'free' lengths after the arm in question
        var sigma_l = lengths.slice(x).reduce((a, b) => a + b, 0)

        // rearranging the position of the end of the arm in terms of theta we get
        // that if base.x * cur_orig.x * sin(theta) + base.y * cur_orig.y * cos(theta) >= const, then our theta
        // checks out
        
        // ... but assuming base.y = 0 then we have that we need base.x * current_origin.x * sin(theta) >= const
        
        var constant = ( Math.pow(base.x,2) + Math.pow(lengths[x],2) - Math.pow(sigma_l,2) ) / ( 2*lengths[x] )
        
        // ... and one final assumption, that base.x is positive
        // check if we have to be strict about lengths
        if ( x < lengths.length - 2 ) {
            
            // then we have that if base.x * current_origin.x >= constant we're good for any angle
            if ( base.x * current_origin.x >= constant ) {
                ranges.push([ 0, 2*Math.PI, 'all' ])
            } 
            
            else {
                // find our inception points
                var theta = Math.asin( constant / ( base.x * current_origin.x ) )

                var y = new THREE.Vector3(0,1,0)

                var alpha = 2 * ( y.angleTo(base.clone().sub(current_origin)) - theta ) 

                // push the range where theta is an acceptable size
                ranges.push([ theta, theta + alpha , 'all' ])

            }
        }
    
        else {
            // find our inception points
            var theta = Math.asin( constant / ( base.x * current_origin.x ) )

            var y = new THREE.Vector3(0,1,0)

            var alpha = 2 * ( y.angleTo(base.clone().sub(current_origin)) - theta ) 

            // push the range where theta is an acceptable size
            ranges.push([ theta, theta + alpha, 'either' ])
            
        }
    }

    return ranges

}

function take_input() {

    // var type = document.getElementById("linkage_type").value
    // var size = document.getElementById("linkage_size").value
    var size = 4
    var show_alternate_switch_position = ( document.getElementById("show_alt_switch").value == "true" )

    var lengths = []
    var coords = []

    for ( var i = 1; i <= size; i++ ) {
        if ( !( (document.getElementById( 'length_'.concat(i) ) === null) ) ) {
            lengths.push( document.getElementById( 'length_'.concat(i) ).value )
        }
        if ( !( (document.getElementById( 'coord_'.concat(i) ) === null) ) ) {
            coords.push( document.getElementById( 'coord_'.concat(i) ).value )
        }
    }

    // console.log(lengths, coords)
    // var ranges = get_polygon_ranges(lengths, coords)
    // console.log(ranges)

    // for (let i = 0; i < (coords.length-1); i++) {
    //     coords[i] = coords[i]
    // }

    // console.log(coords)

    scene.remove( ngon.mesh )
    ngon = new Polygon(size, lengths, coords, [true, false, true, false], show_alternate_switch_position)

}

function edit_fields() {
    var default_length = 1
    var default_angle = 1
    var default_switch = 0

    var type = document.getElementById("linkage_type").value
    var size = document.getElementById("linkage_size").value

    var string = ""

    if (type == "polygon") {

        for (let i = 1; i <= size; i++) {

            // length
            string = string.concat(
                '<span>length ',
                i,  
                '</span><input id = "length_',
                i,
                '" type = "range" min="0.1" max="2" step="0.1" onchange = "take_input()">'
            )

            // angle helper
            string = string.concat(
                '<label for="show_angle_',
                i,
                '_helper">show angle ',
                i,
                'helper</label><input type="checkbox" id="show_angle_',
                i,
                '_helper" onchange = "take_input()"></input>'
            )
            
            // coordinate
            if ( i < size - 1 ) {
                string = string.concat(
                    '<span>coordinate ',
                    i,
                    '</span><input id = "coord_',
                    i,
                    '" type = "range" min="0" max="1" step="0.01" onchange = "take_input()"></input>'
                )
            }

            // line break
            string = string.concat('<br>')
            
        }        
    }

    document.getElementById("lengths_and_coords").innerHTML = string
}

function make_linakge() {

}

var animate = function () {
    // controls.update()
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
}

animate()