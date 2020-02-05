# Math Project, Study of Configuration Spaces

## Current Talking Points

- __Kapovich and Millson vs. Robert Ghrist's "Corollary C"__

    What spurs the difference? Is it significant? 

- __Understanding Kapovich and Millson__

    Lots about algebra's and polynomials, is this something worth stressing over? Is the difference in 'rigor' beween the theorums something that is topologically significant i.e. do the transformations that Kapovich and Millson lay out actually change topological invariants? 

## Current Tasks

- Work out linkages that have confiuration spaces diffeomorphic to some common manifolds: tori, spheres, planes?
- Get an idea of how the configuration space changes with incremental changes in the linkage.
- Rigorusly define the above task, understanding changes in the linkage and how this relates to the configuration space.

## Links

Kapovich and Millson 

Robert Ghrist

Gaiane Panina

The 1985 Undergrad Thesis?

## Project Notes

### Generic Manifolds and Diffeomorphic Linkage Configuration Spaces

##### _Examples of Manifolds and the Linkages that Display them as Configuration Spaces_

$\mathbb S^1 $: A manifold  that leads to a $\mathbb S^1$ configuration space is easy to find, as it is the configuration space of a single linkage at the origin. 

$\mathbb S^2$

$\mathbb S^n $

$\mathbb S^1 \bigcup \, \mathbb S^1 = T^2$: A manifold with the configuration space two disjoint spheres is also pretty okay. This is the linkage represented by a pair of rigid links connected by a linkage that piviots freely around any angle.

##### _What Happens to the Configuration Space as one modifies the Linkage_ 

"Adding to the Chain"

When we add another link onto the end of a simple chain of length $n$ we go from a configuration space of $\bigcup_1^n \, \mathbb S^1 = T^n$ to one of $\bigcup_1^{n+1} \, \mathbb S^1 = T^{n+1}$, in fact, it seems that if we add another link to a system with a configuration space $M$ we will get a configuration space of $M \bigcup \mathbb \, S^1$.  (prove this?) 

"Closing the Loop"

... depends on the degrees of freedom of the joint you close onto. 

##### _Is any Manifold Diffeomorphic to the Configuration Space of a well defined Linkage?_

Robert Ghrist states on page 12 of his book _Elementary Applied Topology_ that: ![image-2020020252237727 pm](/Users/evan/Library/Application Support/typora-user-images/image-2020020252237727 pm.png)

https://www.math.upenn.edu/~ghrist/EAT/EATchapter1.pdf

However, Kapovich and Millson disagree with this in their paper below:

![image-2020020252749698 pm](/Users/evan/Library/Application Support/typora-user-images/image-2020020252749698 pm.png)

https://arxiv.org/pdf/math/9803150.pdf

At first glace I belive this is essentially telling us that not every manifold can be expressed as the configuration of some linkage as these configuration spaces can be transformed in some way (corresponding to moving the linkage in the plane in which it resides, like flipping it perhaps) and thus for any manifold that can't admit this transformation, it can't be diffeomorphic to a configuration space.

I think the best way to work out what is going on here is to work with the definitions of configuration space of a linkage, and decide if this relates to the differing theorum. It seems unlikely that Ghrist is stating his theorum more strongly without reason, given the cited source is Kapovich and Millson's paper.

##### Robert Ghrist Defines a Configuration Space:

Robert Ghrist defines a configuration space as follows (also page 12 of his book):

![image-2020020254030088 pm](/Users/evan/Library/Application Support/typora-user-images/image-2020020254030088 pm.png)  

https://www.math.upenn.edu/~ghrist/EAT/EATchapter1.pdf

This has some points to take away, namely we **are** assigning a distinct point to each layout of the linkage, but we **are not** considering rotations and reflections of the plane as different configurations.

Also, the point *'almost always a manifold'* should also be addressed, this can be narrowed down by assuming that the linkages we look at can never fit into a straight line; this can be found here http://amj.math.stonybrook.edu/pdf-Springer-final/017-0070.pdf in Gaiane Panina's paper, but should probably trace the reference to find it's original source, likely Kapovich and Millson. 

##### Kapovich and Millson Define a _Moduli Space_

Firstly, we should address the difference in terminology used by the authors here, it seems that in this context, looking at linkages the Moduli Space and the Configuration Space are the same thing. 

This is strongly suggested in this paper by Gaiane Panina on the Moduli Space of Planar Linkages here:

![image-2020020255856993 pm](/Users/evan/Library/Application Support/typora-user-images/image-2020020255856993 pm.png)

http://amj.math.stonybrook.edu/pdf-Springer-final/017-0070.pdf

