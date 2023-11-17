import { Component, OnInit } from '@angular/core';
import { ButtonGroupSelection } from '@progress/kendo-angular-buttons';
import { HttpClient } from '@angular/common/http';
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
  buttonOrientation: string,
  buttonList: Array<{ id: number; name: string }>;
}

declare type Category = 'planets' | 'characters' | 'starships';
type ButtonConfig = {display: string, value: Category}
type ColumnConfig = { field: string, title: string }
type CategoryConfig = { [x: string]: { columns: ColumnConfig[], url: string, sortKey: keyof Data, cardTitle: string } }

@Component({
  selector: 'app-starwars-list',
  templateUrl: './starwars-list.component.html',
  styleUrls: ['./starwars-list.component.scss']
})
export class StarwarsListComponent implements OnInit {

  constructor(private httpClient: HttpClient, private starwarService: StarwarsService) {
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
      cardTitle: 'Top 5 Planets',
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

  ngOnInit(): void {
  }

  onNavigate(buttonConfig: ButtonConfig): void {
    this.isLoading = true;
    let config = this.categoryConfig[buttonConfig.value];
    this.currentColumns = config.columns;
    this.clearGrid();
    this.isLoading = true;
    this.fetchAllData(config.url, buttonConfig.value);
    this.categoryTitle = config.cardTitle;
  }

  fetchAllData(url: string, category: Category): void {
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
      this.gridData = [...this.gridData, ...mappedData]; 
      this.sortByData(category);

      url = res.next;
      if (url) {
        this.fetchAllData(res.next, category);
      } else {
        this.isLoading = false; 
      }
    });
  }
 

  public sortByData(category: Category): void {
    let config = this.categoryConfig[category];
    let sortData: Data[] = []
    let prependText = '';
    if (category === 'planets') {
      sortData = this.gridData.sort((a, b) => b.diameter - a.diameter).slice(0,5);
    } else if (category === 'characters') {
      // Using 1977 as the battle of Yavin
      const battleOfYavin = 1977
      const currentYear = new Date().getFullYear();
      sortData = this.gridData.filter(data => {
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
        const yavinAge = data.birthYear.slice(0, -3)

        if (data.birthYear.includes('BBY') && +yavinAge < 40) {
          return true
        }

        return false;
      }).sort((a, b) => b.mass - a.mass).slice(0,5);
    } else if (category === 'starships') {
      sortData = this.gridData.sort((a, b) => parseInt(a.crew) - parseInt(b.crew)).slice(0,5);
    } else {
      this.clearGrid();
    }

    this.cardDetails = sortData.map((item: any) => ({
      bodyTitle: `${item.name}${category === 'characters' ? ', age: ' + item.birthYear : ''}`,
      bodyText: `${config.sortKey.toUpperCase()}: ${item[config.sortKey]}`, 
      buttonOrientation: '',
      buttonList: []
    }));
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
 
  private clearGrid(): void {
    this.gridData = [];
  }
}