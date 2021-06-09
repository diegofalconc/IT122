import { expect } from 'chai';
import * as movie from "../data.js";

describe("Get Movie module", () => {
 it("returns requested movie", function() {
  var object = { movie: "The Last Emperor", director: "Bernardo Bertolucci", year: "1987", theme: "Drama"};
   var result = movie.getItem('The Last Emperor');
   console.log(result);
   expect(result).to.deep.equal(object);
 });

 it("fails w/ invalid movie", () => {
   var result = movie.getItem("fake");
   expect(result).to.be.undefined;
 });
});

describe("Delete Movie module", () => {
 it("deletes requested movie", function() {
  var object = { movie: "The Last Emperor", director: "Bernardo Bertolucci", year: "1987", theme: "Drama"};
   var result = movie.deleteItem(object);
   expect(result).to.deep.equal(true);
 });

 it("fails w/ invalid movie", () => {
   var result = movie.deleteItem("fake");
   expect(result).to.deep.equal(false);
 });
});

describe("Add Movie module", () => {
 it("adds requested movie", function() {
  var object = { movie: "The Last EmperorS", director: "Bernardo Bertolucci", year: "1987", theme: "Drama"};
   var result = movie.addItem(object);
   expect(result).to.deep.equal({movie: "The Last EmperorS", director:"Bernardo Bertolucci", year: "1987", theme: "Drama"});
 });

 it("fails w/ invalid movie", () => {
   var result = movie.getItem("fake");
   expect(result).to.be.undefined;
 });
});