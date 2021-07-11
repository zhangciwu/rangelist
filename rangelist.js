class RangeList {
    constructor() {
        this.current = new Array();
    }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
    add(range) {
        let result = [];
        let i = 0;
        const rangeL = range[0];
        const rangeR = range[1];

        // iterate every item array inside current array 
        // => compare the rangeL and rangeR with item[itemL, itemR] value
        // has 3 cases:
        while(i < this.current.length) {
            const itemL = this.current[i][0];
            const itemR = this.current[i][1];
            // 1. no overlapping, all elements in item array are smaller than range array
            if (itemR < rangeL) {
                // push the item to result
               result.push(this.current[i]);
               i++;
               continue;
            } 

            // 2. some overlapping, update the overlapping parts to range until no overlapping
            // itemL <= rangeR [not itemR < rangeL && rangeR < itemL]
            if (itemL <= rangeR) {
                range[0] = Math.min(range[0], itemL); // rangeL will be the minimum of itemL & rangeL
                range[1] = Math.max(range[1], itemR); // rangeR will be the maximum of itemR & rangeR
                i++;
            }

             // 3. no overlapping, all elements in item array are bigger than range array
             // stop iterate, and add the rest arrays to result
            if (itemL > rangeR) {
                break;
            }
        }
        // push the updated range to result
        result.push(range);

        // push the rest array to result, if any rest arrays left
        while(i<this.current.length) {
            result.push(this.current[i]);
            i++;
        }
        this.current = [...result];
        return result;
    }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
    remove(range) {
        let result = [];
        let i = 0;
        const rangeL = range[0];
        const rangeR = range[1];

        // iterate every item array inside current array 
        // => compare the rangeL and rangeR with item[itemL, itemR] value
        // has main 2 cases:
        while(i < this.current.length) {
            const itemL = this.current[i][0];
            const itemR = this.current[i][1];
            // 1. no overlapping, all elements in item array are smaller or larger than range array
            if (itemR < rangeL || itemL > rangeR) {
                // push the item to result
               result.push(this.current[i]);
               i++;
               continue;
            } 

            // 2. overlapping, update the item array if overlap occurs
            // has 4 cases:
            // 2.1 overlaps the whole item array
            if(rangeL <= itemL && itemR <= rangeR) {
                i++;
                continue;
            }                       

            // 2.2 overlap happens on head parts of the item array, means keep the tail parts of the item array
            if (rangeL <= itemL && rangeR < itemR) {
                this.current[i][0] = rangeR; 
                result.push(this.current[i]);
                i++;
                continue;
            }

            // 2.3 overlap happens on middle parts of item array, split the item array into 2 arrays
            if (itemL < rangeL  && rangeR < itemR ) {
                result.push([itemL, rangeL], [rangeR, itemR]);
                i++;
                continue;
            }

             // 2.4 overlap happens on tail parts of the item array, means keep the head parts of the item array
            if (itemL < rangeL  && itemR <= rangeR) {
                this.current[i][1] = rangeL;
                result.push(this.current[i]);
                i++;
                continue;
            }
        }

        // update current
        this.current = [...result];
        return result;
    }
  /**
   * Prints out the list of ranges in the range list
   */
    print() {
        console.log(this.current);
    } 
}

const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
rl.remove([-30, 20]);
rl.print();

rl.add([-30, 10]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([-30, 20]);
rl.print();