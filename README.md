## Deployed Link : https://adnan-samir-steeleye-frontend-assign.netlify.app/
# Q1. Explain what the simple List component does.

ANS) React's simple List component renders an array of items as a list of clickable items from an array of items provided as a parameter.  `SingleListItem` and `List`, two of its constituent parts, cooperate to render each item in the list and control the selected item's state.

A `SingleListItem` component, which uses the item's text as a parameter and displays it in a list item element, represents each item. When a list item `(li)` is clicked, its background colour changes to green and the parent `WrappedListComponent's` state is updated to reflect the currently selected item. The list's single item is rendered by the `SingleListItem` component. `index`, `isSelected`, `onClickHandler`, and text are the four props required. When an item is clicked, a callback function called `onClickHandler` is invoked. Text is the `text` that should be displayed for the `item`. `index` is the index of the current item in the `list`, `isSelected` is a boolean indicating whether the item is presently selected, and `onClickHandler` is a callback function. The component creates a `(li)` element that displays the item's text and has a background colour that is either green or red depending on whether the item is selected. The `onClickHandler` method receives the item's `index` as an argument when the `item` is clicked.

To handle state and update it when the list of items changes, the List component makes use of the `useState` and `useEffect` hooks. When an `item` is clicked, the `handleClick` function is invoked, which updates the state to hold the index of the selected item. The List component then renders a `SingleListItem` component for each item in the array of items while giving in the required props.

Following that, the component traverses the array of items and creates a `SingleListItem` component for each item, passing in the required props. Each item's `onClickHandler` function alters the selected item's background colour by setting the selectedIndex state to the clicked item's index. A `ul` element containing each of the created `SingleListItem` components is then rendered by the component.

In conclusion, the List component offers a straightforward and reusable method for creating a list of things in a React application. It also shows how to build smaller sub-components to construct larger, more complicated components, as well as how to use hooks like `useState` and `useEffect` to control component state.



 # Q2. What problems / warnings are there with code?

There are certain issues and cautions with the code that must be fixed:

 ## 1. setSelectedIndex is being used incorrectly:

   The `useState hook` is being used to initialise `selectedIndex` to `null`, but `setSelectedIndex` is being used to adjust its value, which is contrary to how `setState` functions. To read the current state and to alter it, use `selectedIndex` and `setSelectedIndex`, respectively. To correct this, the code for `SingleListItem's`  `isSelected` prop should be modified to use `selectedIndex` rather than `setSelectedIndex`.
   
# Given:

 ``` js 
 const [setSelectedIndex, selectedIndex] = useState(); //incorrect sequence
 ```
 
 # Modified:

```js
const [ selectedIndex, setSelectedIndex] = useState(); //corrected code
```

    
 ## 2. PropTypes declaration issue:

  `PropTypes.array(PropTypes.shapeOf(...))` is used to declare the items prop in the `WrappedListComponent`, but `arrayOf` should be used instead, and `PropTypes.shape(...)` should be used to describe the shape.
  
  # Given :

```js
  WrappedListComponent.propTypes = {
  items: PropTypes.array(PropTypes.shapeOf({ //ShapeOf is not a Valid Function
    text: PropTypes.string.isRequired,
  })),
 };
 ```
# Modified:

```js 
  WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ //Correct Function is ArrayOf
    text: PropTypes.string.isRequired,
  })),
 };
 ```
## 3. Issue with onClickHandler:
 
  `onClickHandler` is not being used properly in `WrappedSingleListItem`. Instead of being supplied as a callback function, it is being invoked right away. Wrapping it inside an anonymous arrow function, as in `onClick=() => onClickHandler(index)`, will correct this.
  
  # Given:

```js
  const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={onClickHandler(index)}> //callback is not defined 
      {text}
    </li>
  );
};
```

 # Modified:

```js
  const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)}> //callback defined 
      {text}
    </li>
  );
};
```
## 4. PropType for index prop:

  Although it should be defined as `PropTypes.number`, the `index` prop in `WrappedSingleListItem` is declared with `PropTypes.number.isRequired` because it is necessary for the component to operate as intended.
  
   # Given:
  
 ```js
 WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
```
  
# Modified:
  
```js WrappedSingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
```

## 5. The default value of `null` for the `items` prop in `WrappedListComponent` can lead to issues when attempting to perform mapping operations on it.

   #  Given:

```js
WrappedListComponent.defaultProps = {
  items: null,
};```

# Modified:

```js
WrappedListComponent.defaultProps = {
  items: [
    { text: 'Adnan Samir' },
    { text: '12003553' },
    { text: 'B-Tech' },
    { text: 'CSE' },
    { text: 'LPU' },
  ],
};
```

## 6. We can alter the `isSelected` property to read `isSelected = (SelectedIndex === Index)` to make sure that only the clicked option changes colour and not the entire contents of a list. This will enable us to change the colour of the chosen choice according to its position in the list.

# Given:

```js return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}// using this syntax, all available colours are selected and changed.
        />
      ))} </ul>
  )};```
  
# Modified:

```js return (
    <ul style={{ textAlign: 'left' }};
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex=== index}// Whenever a user selects an option, only that option's colour changes.        
          />
      ))} </ul>
  )};
  ```
  
  
  # Q3. Please fix, optimize, and/or modify the component as much as you think is necessary.
  
   ANS) The working modified code : 
  
```js
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';`

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
        key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: [
    { text: 'Adnan Samir' },
    { text: '12003553' },
    { text: 'B-Tech' },
    { text: 'CSE' },
    { text: 'LPU' },
  ],
};

const List = memo(WrappedListComponent);

export default List;



```



       
   




   
