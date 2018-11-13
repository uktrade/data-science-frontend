<template>
    <div class="govuk-form-group js-prevent-submit">
        <div class=" app-filter-group-heading">
            <label class="govuk-label govuk-!-font-weight-bold app-filter-label">
                {{ filterTitle }}
            </label>

            <div class="govuk-form-group">
                <label class="govuk-label app-filter-subheading">
                    Search for country
                </label>
                <input class="govuk-input" type="text" v-on:keyup.prevent="getQuery">
            </div>
        </div>

        <div class="app-filter-group-list">
            <div class="govuk-form-group">
                <div class="govuk-checkboxes app-filter-checkboxes-group">
                    <div v-for="item in list" class="govuk-checkboxes__item">
                        <input type="checkbox"
                               :value="item.value"
                               :checked="item.checked"
                               class="govuk-checkboxes__input"
                               v-model="selectedItems"
                               v-on:click.prevent="asyncFilter">
                        <label
                               class="govuk-label govuk-checkboxes__label"
                        >{{item.text}}</label>
                    </div>
                </div>
            </div>
        </div>
        <input type="hidden" :id="id" :name="filterName" class="app-hidden-filter" :value="selectedItems">
    </div>
</template>
<script>
  import { debounce, each, filter, flatten, isArray, map, pickBy, split, uniq} from 'lodash'

  const XHR = require('../lib/xhr')
  const getFormData = require('get-form-data').default

  function filterCountries(query, countries) {
    return countries.filter((country) => {

      const countryName = country.text
      const regex = new RegExp(query.replace(/\s\s+/g, ' '), 'i');

      return countryName.match(regex);
    });
  }

  export default {
    name: 'checkbox-typeahead',

    created() {
      this.$http.get(`/${this.filterName}${window.location.search}`).then(function(response){
        this.initialList = response.data
        this.list = this.initialList
        this.selectedItems = map(filter(this.list, (item) => item.checked), (item) => item.value)
      }.bind(this))
    },

    props: {
      filterName: {
        type: String,
        required: true,
      },
      filterTitle: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },

    data : function() {
      return {
        selectedItems: [],
        selectedList: [],
        list: this.intialList,
        query: ''
      }
    },

    methods: {
      getQuery(item) {
        const query = item.target.value

        if (query.length >= 3) {
          this.list = filterCountries(query, this.initialList)
        } else {
          this.list = this.initialList
        }
      },

      asyncFilter(event) {
        const value = event.target.value

        map(this.list, (country) => {
          if(country.value === value) {
            country.checked = !country.checked
            console.log(country.value, country.checked)
          }
        })

        if (this.selectedItems.indexOf(value) === -1) {
          this.selectedItems.push(value)
        } else {
          this.selectedItems.splice(this.selectedItems.indexOf(value))
        }

        const form = this.formSelector ? document.querySelector(this.formSelector) : this.$el.closest('form')
        if (!form) { return }

        const query = pickBy(getFormData(form))
        query[this.filterName] = this.selectedItems

        // TODO(jf): Make this more abstract
        if (this.filterName === 'market-of-interest') {
          query['market-exported-to'] = split(query['market-exported-to'], ',')

        } else if (this.filterName === 'market-exported-to') {
          query['market-of-interest'] = split(query['market-of-interest'], ',')
        }

        XHR.request(form.action, query)
          .then(() => {
            this.isSubmitting = false
          })
      },
    },
  }
</script>