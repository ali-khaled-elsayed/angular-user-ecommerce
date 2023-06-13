import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products:any = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[]= [];

  constructor(private service: ProductsService){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.loading= true;
    this.service.getAllProducts().subscribe((res:any) => {
      this.products = res;
      this.loading=false;
    } , error => {
      alert('error');
    });
  }

  getCategories(){
    this.loading= true;
    this.service.getAllCategories().subscribe((res:any) => {
      this.categories = res;
      this.loading= false;
    } , error => {
      alert('error');
    });
  }

  filterCategory(event:any){
    let value = event.target.value;
    if(value === 'All'){
      this.getProducts();
    }else{
      this.getProductsByCategory(value);
    }
  }

  getProductsByCategory(filter: string){
    this.loading= true;
    this.service.getProductsByCategory(filter).subscribe(res => {
      this.products = res;
      this.loading= false;
    } , error => {
      alert('error');
    });
  }

  addToCart(event: any){
    console.log(event);
    if ("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id);
      if (exist) {
        alert("product aleardy in your cart");
      }else{
        this.cartProducts.push(event);
      localStorage.setItem("cart" ,JSON.stringify(this.cartProducts));
      }
    }else{
      this.cartProducts.push(event);
      localStorage.setItem("cart" ,JSON.stringify(this.cartProducts));
    }
   
  }
}
