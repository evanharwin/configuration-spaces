### Early February

#### Current Talking Points

- __Exploring the Configuration Space of the 5-gon__
    Kevin Walker talks about how you can supposedly derive all of the orientable 2-manifolds from genus zero to four, looking at the configuration space of a $C_5$ with different length functions.

    However, he does this from a diagram I can't claim to understand yet.

    I think the roots of this come from something called a fibered product, as well as an idea that if you add a link of a small enough length to something you can gain a Cartesian product with an $\mathbb S^1$ in your configuration space.

- __Discussing my Approach to Finding Homotopies__
    I decided to work through finding a homotopy between the rectangle linkage and the manifold composed of two $\mathbb S^1$'s, disjoint besides two antipodal points. 

      This was a little fiddly but the main issue is that it looks super messy and is hard to understand, even though the intuition as to why it works feels simple.

      I was wondering if maybe in the 'final product' I should go through some trivial homotopies like the n-arms and leave the more complicated stuff to be explained in words?

- __Understanding the Importance of Nash Isomorphisms__
    I had a look at what I could find out about Nash Isomorphisms, and I managed to find a definition of a Nash function, and _I think_ I've got an idea of what a Nash manifold is. Then I found a theorum about how all smooth compact manifolds (even permitting some boundaries) are diffeomorphic to a Nash manifold. This seems interesting, but I have yet to really understand why it might come in helpful looking at linkages.

#### Looked At This Meeting

-   Demonstrated the existence of a homotopy between the configuration space of a rectangle and a manifold composed of two circles intersecting at two points.
-   Programmed the structure needed for threejs rendering, a webpage using threejs and orbit controls, as well as a script for defining the objects to render
-   Defined `Manifold`, `CirclesTwoIntersections`, `Linkage` and  `Polygon` classes. `CirclesTwoIntersections` is  fully functional and looking pretty:
    ![image-20200213111521351](C:/Users/evan/Documents/configuration-spaces/images/image-20200213111521351.png)
    However `Polygon` still needs a little work:
    ![image-20200213111607569](C:/Users/evan/Documents/configuration-spaces/images/image-20200213111607569.png)(meant to be a 2x1 rectangle)
-   Defined a standard way to specify the configuration of a manifold.
-   Found and understood the Classification of 2-Manifolds. As well as finding an example of a linkage that provides as a configuration space the orientable manifolds of genus 0 through 3 in Kevin Walkers paper, however I don't fully understand this yet. Somehow it's meant to pop out of this diagram?
    ![image-20200213113026760](C:/Users/evan/Documents/configuration-spaces/images/image-20200213113026760.png)