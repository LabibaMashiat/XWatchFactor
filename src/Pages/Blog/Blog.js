import React from 'react';

const Blog = () => {
    return (
        <div>
           <div className='grid md:grid-cols-2 justify-items-center gap-6'>
           <div className="card w-96 shadow-xl bg-slate-100 ">
  <div className="card-body">
    <h2 className="card-title">Different ways to manage a state in a React application</h2>
    <p>The state of any application is represented by the user interface of the application. The state is mutable and whenever the user interacts with the application and changes its state, the user interface of the app may change as it will be represented by the new state. These states can be managed by a React component. The main objectives of the react component are to store the state and allow it to get updated once the user interacts with the application. It also ensures that the UI change whenever there is any update in the State. <br />There are mainly four ways to manage a state in React application .They are: <br />1.Local State <br />2.Global State <br />3.Server State <br />4.URL State </p>
  </div>
</div> 
           <div className="card w-96 shadow-xl bg-slate-100 ">
  <div className="card-body">
    <h2 className="card-title">How does prototypical inheritance work?</h2>
    <p>In programming, we often want to take something and extend it.

For instance, we have a user object with its properties and methods, and want to make admin and guest as slightly modified variants of it. We would like to reuse what we have in user, not copy/reimplement its methods, just build a new object on top of it.

Prototypal inheritance is a language feature that helps in that.When we read a property from object, and its missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”. <br />
In Prototype Inheritance, an object uses the properties or methods of another object via the prototype linkage. All the JavaScript objects inherit properties and methods from a prototype (like Date objects inherit properties from Date.prototype and so on).</p>
  </div>
</div> 
           <div className="card w-96 shadow-xl bg-slate-100 ">
  <div className="card-body">
    <h2 className="card-title">What is a unit test? Why should we write unit tests?</h2>
    <p>Unit tests are typically automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended. In procedural programming, a unit could be an entire module, but it is more commonly an individual function or procedure.Basically unit test is written: <br />1.Reduces Defects in the Newly developed features or reduces bugs when changing the existing functionality. <br />2.Reduces Cost of Testing as defects are captured in very early phase. <br />3.Improves design and allows better refactoring of code. <br /> 4.Unit Tests, when integrated with build gives the quality of the build as well. </p>
  </div>
</div> 
           </div>
           <div className="card max-w-fit mx-auto  shadow-xl bg-slate-100 mt-20 ">
  <div className="card-body">
    <h2 className="card-title">React vs Angular vs Vue</h2>
    <div className="overflow-x-auto">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>React</th>
        <th>Angular</th>
        <th>Vue</th>
      </tr>
    </thead>
    <tbody>
      
      <tr>
        <th>Feature</th>
        <td>Open Source JS Library</td>
        <td>Javascript framework</td>
        <td>Progressive Javascript framework</td>
      </tr>
      
      <tr>
        <th>Coding Speed</th>
        <td> Normal</td>
        <td> slow</td>
        <td> medium</td>
      </tr>
      
      <tr>
        <th>Data Binding</th>
        <td>Uni-Directional</td>
        <td>Bi-Directional</td>
        <td>Bi-Directional</td>
      </tr>
      <tr>
        <th>Rendering</th>
        <td>Server</td>
        <td>Client</td>
        <td>Server</td>
      </tr>
      <tr>
        <th>Code Reusability</th>
        <td>No,Only CSS</td>
        <td>Yes</td>
        <td>Yes,CSS & HTML</td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
</div> 
        </div>
    );
};

export default Blog;