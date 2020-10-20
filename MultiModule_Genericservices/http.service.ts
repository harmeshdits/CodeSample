/*Angular core modules*/
import { HttpClient, HttpHeaders, } from "@angular/common/http";
import { Observable} from "rxjs";
import { catchError, retry } from "rxjs/operators";
import  {Utils} from '../Util/Utils';

export class SharedHttpService<T> {
 
   public httpOptions = {
      headers: new HttpHeaders(
          { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
          })
    };  

   constructor(private url: string, private httpClient: HttpClient, private endpoint: string) { }
      
    get(): Observable<T[]> {
      return this.httpClient
          .get<T[]>(`${this.url}/${this.endpoint}`)
          .pipe(
              retry(2),
              catchError(Utils.handleError)
          )
    }
    getById(id: number): Observable<T> {
      return this.httpClient
          .get<T>(`${this.url}/${this.endpoint}/${id}`)
          .pipe(
              retry(2),
              catchError(Utils.handleError)
          )
    }  
    
    create(item: T): Observable<T> {
        return this.httpClient.post<T>(`${this.url}/${this.endpoint}`, JSON.stringify(item), this.httpOptions)
            .pipe(
                retry(2),
                catchError(Utils.handleError)
            )
    }

    update(item: T): Observable<T> {       
        return this.httpClient.put<T>(`${this.url}/${this.endpoint}`, item, this.httpOptions)
            .pipe(
                retry(2),
                catchError(Utils.handleError)
            )
    }

    delete(item: number) {
        return this.httpClient.delete<T>(`${this.url}/${this.endpoint}/${item}`)
            .pipe(
                retry(2),
                catchError(Utils.handleError)
            )
    }

      
    getDetailById(data): Observable<T> {     
        return this.httpClient
            .get<T>(`${this.url}/${this.endpoint}/`+'?' + Utils.objectToQueryString(data))
            .pipe(
                retry(2),
                catchError(Utils.handleError)
            )
      }
  
        
  }