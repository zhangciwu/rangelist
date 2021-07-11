# rangelist

## how to run the program
```
### prerequisite: node
### node rangelist.js
```
## solution & chart
**add()** has 3 cases/phases
1. non overlapping, item array on left of the range array
    - push item to result
2. overlapping
     - update range array in place
3. non overlapping, item array on right of the range array
     - break the while loop 
- push range array to result
- push the rest item array to result
  
<img src="./source/add.png" alt="add" width="400">

**remove()**  has 2 cases
1. non overlapping
    - push item to result
2. overlapping
   1. range array overlap whole item array 
      - skip item
   1. range array overlap left part item array 
      - slice & update item array
      - push item to result
   2. range array slice item array into 2 arrays
      - slice & update item array
      - push 2 item arrays to result
   1. range array overlap right part item array 
      - slice & update item array
      - push item to result
 
<img src="./source/remove.png" alt="remove" width="400">

