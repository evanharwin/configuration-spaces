// set up scenes
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera( window.innerWidth / - 200, window.innerWidth / 200, window.innerHeight / 200, window.innerHeight / - 200, 1, 1000 );
camera.position.z = 3

// build renderers
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
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
    }
    draw_lines() {
        var material = new THREE.LineBasicMaterial( { color: 0xffffff } )
        this.lines.forEach(line => {
            let geometry = new THREE.BufferGeometry().setFromPoints( line )
            let mesh = new THREE.Line( geometry, material )
            scene.add( mesh )
        })
    }
}

class Polygon extends Linkage {
    constructor( size, lengths, coords ) {
        super()
        
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
        let a = lengths[ lengths.length - 2 ]
        let b = lengths[ lengths.length - 1 ]
        let c = this.lines[ this.lines.length - 1 ][1].distanceTo( this.lines[0][0] )
        let x = ( Math.pow(c,2) - Math.pow(b,2) + Math.pow(a,2) ) / (2*c)
        let theta = Math.acos( this.lines[ this.lines.length - 1 ][1].clone().sub( this.lines[0][0] ).y / c )
        let alpha = Math.cos( x/a )
        let angle = theta - alpha

        console.log(a,b,c,x)
        console.log(theta, alpha, angle)
        console.log(new THREE.Vector3(a*Math.cos(angle),a*Math.sin(angle),0))

        this.lines.push([
            this.lines[ this.lines.length - 1 ][1],
            this.lines[ this.lines.length - 1 ][1].clone().add( new THREE.Vector3(a*Math.cos(angle),a*Math.sin(angle),0) )            
        ])

        this.lines.push([
            this.lines[ this.lines.length - 1 ][1],
            this.lines[0][0]
        ])

        console.log(this.lines)
        this.draw_lines()

    }
}

// var fourgon = new Polygon(4, [2,1,2,1], [0, 0])
// var link = new Polygon(1, [1], [])
// var loopthing = new CirclesTwoIntersections()
var loopthing2 = new CirclesTwoIntersectionsSpecialCase()

var animate = function () {
    controls.update();
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
}

animate()