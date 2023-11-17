import { Component, OnInit } from '@angular/core';
import { ButtonGroupSelection } from '@progress/kendo-angular-buttons';
import { StarwarsService } from '../service/starwars.service';

interface Data {
 name: string;
 diameter: number;
 population: number;
 climate: string;
 gender: string;
 mass: number;
 gravity: number;
 birthYear: string;
 eyeColor: string;
 consumables: string;
 crew: string;
 passengers: number;
 starshipClass: string;
}

interface cardDetails {
  bodyTitle: string,
  bodyText: string,
}

type Category = 'planets' | 'characters' | 'starships' | 'none';
type ButtonConfig = {display: string, value: Category}
type ColumnConfig = { field: string, title: string }
type CategoryConfig = { [x: string]: { columns: ColumnConfig[], url: string, sortKey: keyof Data, cardTitle: string } }

@Component({
  selector: 'app-starwars-list',
  templateUrl: './starwars-list.component.html',
  styleUrls: ['./starwars-list.component.scss']
})
export class StarwarsListComponent implements OnInit {

  constructor(private starwarService: StarwarsService) {
  }
 
  mode = 'single' as ButtonGroupSelection;
 
  // Display can have spaces and other text whereas value would explicitely be used to compare and run logic
  buttonConfigs: ButtonConfig[] = [
    { display: 'Planets', value: 'planets'},
    { display: 'Characters', value: 'characters' },
    { display: 'Starships',  value: 'starships'},
  ];

  categoryConfig: CategoryConfig = {
    planets: {
      cardTitle: 'Top 5 Largest Planets',
      url: 'https://swapi.dev/api/planets/',
      sortKey: 'diameter',
      columns: [
        { field: 'name', title: 'Name' },
        { field: 'diameter', title: 'Diameter' },
        { field: 'population', title: 'Population' },
        { field: 'climate', title: 'Climate' },
        { field: 'gravity', title: 'Gravity'}
      ]
    },
    characters: {
      cardTitle: 'Top 5 Characters less than 40',
      url: 'https://swapi.dev/api/people/',
      sortKey: 'mass',
      columns: [
        { field: 'name', title: 'Name' },
        { field: 'gender', title: 'Gender' },
        { field: 'mass', title: 'Mass' },
        { field: 'birthYear', title: ' Birth Year'},
        { field: 'eyeColor', title: 'Eye Color' }
      ]
    },
    starships: {
      cardTitle: '5 Smallest Crewed Starships',
      url: 'https://swapi.dev/api/starships/',
      sortKey: 'crew',
      columns: [
        { field: 'name', title: 'Name' },
        { field: 'consumables', title: 'Consumables' },
        { field: 'crew', title: 'Crew' },
        { field: 'passengers', title: 'Passengers'},
        { field: 'starshipClass', title: 'Starship Class' }
      ]
    }
  }
 
  cardDetails: cardDetails[] = [];
 
  gridData: Data[] = [];
  currentColumns: any[] = []
  isLoading: boolean = false;
  pageSize: number = 10;
 
  planetsData: any[] = [];

  categoryTitle: string = '';
  currentCategory: Category = 'none';

  ngOnInit(): void {
  }

  onNavigate(buttonConfig: ButtonConfig): void {
    this.isLoading = true;
    this.currentCategory = buttonConfig.value;
    let config = this.categoryConfig[buttonConfig.value];
    this.currentColumns = config.columns;
    this.clearGrid();
    this.fetchAllData(config.url, buttonConfig.value);
    this.categoryTitle = config.cardTitle;
  }

  fetchAllData(url: string, category: Category): void {
    if (this.currentCategory === category) {
      this.starwarService.fetchCategoryData(url).subscribe((res: any) => {
        const mappedData = res.results.map((item: any) => {
          return {
            name: item.name,
            gender: item.gender,
            mass: item.mass,
            diameter: item.diameter,
            population: item.population,
            climate: item.climate,
            gravity: item.gravity,
            birthYear: item.birth_year,
            eyeColor: item.eye_color,
            consumables: item.consumables,
            crew: item.crew,
            passengers: item.passengers,
            starshipClass: item.starship_class,
          };
        });
        // We need to write this condtion here as well because when we change tab and the category is still loading data
        // it will run some of these and disrupt the data
        if (this.currentCategory === category) {
          this.gridData = this.gridData.concat(mappedData); 
          // We need to do this as sorting gridData changes the main array as well and chages the UI
          let clonedData = JSON.parse(JSON.stringify(this.gridData))
          this.sortByData(category, clonedData);

          url = res.next;
          if (url) {
            this.fetchAllData(res.next, category);
          } else {
            this.isLoading = false; 
          }
        }   
      });
    }
  }

  // Put this in service as we shouldnt do this in component.
  public sortByData(category: Category, clonedData: any): void {
    let config = this.categoryConfig[category];
    let sortData: Data[] = []
    let prependText = '';

    if (category === 'planets') {
      sortData = clonedData.sort((a: any, b: any) => b.diameter - a.diameter).slice(0,5);
    } else if (category === 'characters') {
      // Using 1977 as the battle of Yavin
      const battleOfYavin = 1977;
      const currentYear = new Date().getFullYear();
      sortData = clonedData.filter((data: any) => {
        // let age = 0;
        // const yavinAge = data.birthYear.slice(0, -3)
        // if (data.birthYear.includes('BBY')) {
        //   age = (currentYear - battleOfYavin) + +yavinAge
        // } else {
        //   age = (currentYear - battleOfYavin) - +yavinAge
        // }

        // if (age < 40) {
        //   return true;
        // }
        // Based on the data there arnt any ABY ages so keeping it as just BBY and not calculating based on current date

        let age = 0;
        const yavinAge = data.birthYear.slice(0, -3);

        if (data.birthYear.includes('BBY') && + yavinAge < 40) {
          return true;
        }
        return false;
      }).sort((a: any, b: any) => b.mass - a.mass).slice(0,5);
    } else if (category === 'starships') {
      sortData = clonedData.sort((a: any, b: any) => parseInt(a.crew) - parseInt(b.crew)).slice(0,5);
    } else {
      this.clearGrid();
    }

    this.cardDetails = sortData.map((item: any) => ({
      bodyTitle: item.name,
      bodyText: `${category === 'characters' ? 'Age: ' + item.birthYear : ''} ` + `${config.sortKey}: ${item[config.sortKey]}`
    }));
  }
  private clearGrid(): void {
    this.gridData = [];
  }
 
  // started with this, Refactored to config
  // private getPlanetList(): void {
  //   this.clearGrid();
  //   this.isLoading = true; 
  //   this.fetchAllData(this.buttonTabs[0].url);
  // }
 
  // private getPeopleList(): void {
  //   this.clearGrid();
  //   this.isLoading = true; 
  //   this.fetchAllData(this.buttonTabs[1].url);
  // }
 
 
  // private getStarshipList(): void {
  //   this.clearGrid();
  //   this.isLoading = true; 
  //   this.fetchAllData(this.buttonTabs[2].url);
  // }

}