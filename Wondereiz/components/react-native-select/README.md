# rect-native-select

react-native-select is a highly customizable dropdownlist for android and ios.

# Insallation

```
npm install @redmin_delishaj/react-native-select
```

## Basic Usage

```
import Select, { SelectItem } from '@redmin_delishaj/react-native-select';

const data: SelectItem[] = [
  { text: 'Option 1', value: 1 },
  { text: 'Option 2', value: 2 },
  { text: 'Option 3', value: 3 },
];

const App = () => {

  const [selectedItem, setSelectedItem] = useState<any>();

  return (
      <Select
        data={data}
        onSelect={value => setSelectedItem(value)}
        value={selectedItem}
      />
  );
};
```

## Basic Config

```
import Select, { SelectConfig, SelectItem } from '@redmin_delishaj/react-native-select';

const data: SelectItem[] = [
  { text: 'Option 1', value: 1 },
  { text: 'Option 2', value: 2 },
  { text: 'Option 3', value: 3 },
]

const App = () => {

  const [selectedItem, setSelectedItem] = useState<any>();

  const config: SelectConfig = {
    fontSize: 18,
    backgroundColor: '#404040',
    textColor: 'white',
    selectedBackgroundColor: 'white',
    selectedTextColor: 'black',
    selectedFontWeight: 'bold',
  }

  return (
    <Select
      data={data}
      onSelect={value => setSelectedItem(value)}
      value={selectedItem}
      config={config}
    />
  );
};
```

## Props

| Name                | Description                                                                                                                    | Details                           |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| `data`              | Dropdown options                                                                                                               | SelectItem[]                      |
| `value`             | Selected item                                                                                                                  | any                               |
| `onSelect`          | Callback which returns the `value`                                                                                             | function<br>(value?: any) => void |
| `onClick`           | Callback when the textbox is clicked                                                                                           | function<br>() => void            |
| `isVisible`         | Manually controlls the dropdown visibility<br>Don't use it if you wnat to the component to handle the visibility automitically | boolean                           |
| `isDisabled`        | Disable the dropdown                                                                                                           | boolean                           |
| `search`            | Enable search                                                                                                                  | boolean                           |
| `placeholder`       | Placeholder text                                                                                                               | string                            |
| `searchPlaceholder` | Search placeholder text                                                                                                        | string                            |
| `noDataText`        | Text that is displayed when there is no data                                                                                   | string                            |
| `spacing`           | Space between textbox and dropdown                                                                                             | boolean                           |
| `width`             | The width of the whole component                                                                                               | number, string                    |
| `dropdownHeight`    | The maximum height of the dropdown                                                                                             | number                            |
| `zIndex`            | Component z index                                                                                                              | number                            |
| `config`            | Contains props for quick styling                                                                                               | SelectConfig                      |

## Style Props

| Name                      | Description                           | Details                |
|---------------------------|---------------------------------------|------------------------|
| `textBoxStyle`            | Textbox style                         | StyleProp\<ViewStyle\> |
| `textBoxTextStyle`        | Textbox text style                    | StyleProp\<TextStyle\> |
| `dropdownStyle`           | Dropdown style                        | StyleProp\<ViewStyle\> |
| `optionTextStyle`         | Option text style                     | StyleProp\<ViewStyle\> |
| `selectedBackgroundStyle` | Background style of the selected item | StyleProp\<ViewStyle\> |
| `selectedTextStyle`       | Text style of the selected item       | StyleProp\<ViewStyle\> |
| `searchStyle`             | Search style                          | StyleProp\<ViewStyle\> |

## Custom Component Props

| Name              | Description                                            | Details           |
|-------------------|--------------------------------------------------------|-------------------|
| `caretIcon`       | Icon displayed when the dropdown is closed             | () => JSX.Element |
| `clearIcon`       | Icon displayed when the dropdown is open               | () => JSX.Element |
| `noDataComponent` | Component that will be displayed when there is no data | () => JSX.Element |

## Types

SelectItem

| Name    | Description                               | Details |
|---------|-------------------------------------------|---------|
| `text`  | Select option text that will be displayed | string  |
| `value` | The value of the Select item              | any     |

Config

| Name                      | Description                                           | Details                                                                                  |
|---------------------------|-------------------------------------------------------|------------------------------------------------------------------------------------------|
| `backgroundColor`         | Background color for both textbox and dropdown        | string                                                                                   |
| `textColor`               | Text color for both textbox and dropdown              | string                                                                                   |
| `fontSize`                | Font size of all text on this component               | number                                                                                   |
| `fontFamily`              | Font family of all text on this component             | string                                                                                   |
| `fontWeight`              | Font weight of all text on this component             | "normal", "bold",<br>"100", "200", "300",<br>"400", "500", "600",<br>"700", "800", "900" |
| `selectedBackgroundColor` | Background color of the selected item                 | string                                                                                   |
| `selectedTextColor`       | Text color of the selected item                       | string                                                                                   |
| `selectedFontFamily`      | Font family of the selected item                      | string                                                                                   |
| `selectedFontWeight`      | Font weight of the selected item                      | "normal", "bold",<br>"100", "200", "300",<br>"400", "500", "600",<br>"700", "800", "900" |
| `placeholderTextColor`    | Text color of textbox and search placeholder          | string                                                                                   |
| `disabledTextColor`       | Text color of textbox when this component is disabled | string                                                                                   |
| `borderWidth`             | Border width of both textbox and dropdown             | number                                                                                   |
| `borderColor`             | Border color of both textbox and dropdown             | string                                                                                   |
| `borderRadius`            | Border radius of both textbox and dropdown            | number                                                                                   |
