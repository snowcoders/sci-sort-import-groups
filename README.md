# Sort import groups

Sort import statements by group while preserving comments. 

Note: Meant as a work around since sort-imports doesn't support comments. Will likely be deprecated once that functionality is available within that library.

## Run it

1. Show all commands
 - Windows - F1 or Ctrl + Shift + P
 - Mac - Ctrl + Cmd + P
2. Run Sort (module)

## Features

Given the following input
```
// Comment at the top of the file if you want to have one
import React from 'react';

// Components - External
import { Checkbox } from 'checkbox';
import RangePicker from 'range-picker';
import {RadioGroup, RadioButton} from 'radio-group';
import { Button } from 'button';

// Components - Internal
import AwesomePanel from '../../awesome-panel';
import ChildComponent4 from './child-component-4';
import ChildComponent1 from './child-component-1';
import AnotherPane from '../../another-pane';
import ChildComponent3 from './child-component-3';
import ChildComponent2 from './child-component-2';
import { 
    Something,
    type SomethingProps,
    type SomethingSubProps } from '../something';

export class BestComponent extends React.Component<> {
```

The output would be
```
// Comment at the top of the file if you want to have one
import React from 'react';

// Components - External
import { Button } from 'button';
import { Checkbox } from 'checkbox';
import {RadioGroup, RadioButton} from 'radio-group';
import RangePicker from 'range-picker';

// Components - Internal
import AnotherPane from '../../another-pane';
import AwesomePanel from '../../awesome-panel';
import { 
    Something,
    type SomethingProps,
    type SomethingSubProps } from '../something';
import ChildComponent1 from './child-component-1';
import ChildComponent2 from './child-component-2';
import ChildComponent3 from './child-component-3';
import ChildComponent4 from './child-component-4';

export class BestComponent extends React.Component<> {
```

Here is what is happening here:
 - Sorting all contiguous import statements by the module path
 - All comments and line-spacing are maintained. This allows you to organize your imports in semantic groups
 - Ordering by module path results in less merge conflicts later
 - Select only the lines you want to sort or sort everything when no text is selected

## Extension Settings

None yet, feel free to request some in Github!

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release!
